import list from './filmArrayCurrent'
import listFuture from './filmArrayFuture'
import DB from '../../../firebase/index'

import router from '../../router/index'

export default{
   mutations: {
      async downloadFilmsType(state, type){
         try{
            if (type === 'films/currentFilms'){
               state.currentFilms = await DB.getData(type);
               if (!state.currentFilms) {
                  state.currentFilms = [];
               }
            }else{
               state.futureFilms = await DB.getData(type);
               if (!state.futureFilms) {
                  state.futureFilms = [];
               }
            }
         } catch(err){
            console.log(err);
         }
      },
      async changeFilm(state, array){
         state.currentFilms[array[0]] = array[1];
         await DB.sendData(`films/${array[2]}s/${array[0]}`, state.currentFilms[array[0]]).then(() =>{
            router.push({ path: '/films' });
         });
      },
      async addNewFilm(state, array){
         let newFilm = array[0];
         if (array[1] === 'currentFilm'){
            if (state.currentFilms.length !== 0) {
               newFilm.id = String(Number(state.currentFilms[state.currentFilms.length - 1].id) + 1);
            } else newFilm.id = String(state.currentFilms.length);
            state.currentFilms.push(newFilm);
            await DB.sendData('films/currentFilms', state.currentFilms).then(() =>{
               router.push({ path: '/films' });
            })
         }else{
            if (state.futureFilms.length !== 0) {
               newFilm.id = String(state.futureFilms[state.futureFilms.length - 1].id + 1);
            } else newFilm.id = String(state.futureFilms.length);
            state.futureFilms.push(newFilm);
            await DB.sendData('films/futureFilms', state.futureFilms).then(() => {
               router.push({ path: '/films' });
            })
         }
         
         
      },
      async deleteFilm(state,array){
         if (array[1] === 'currentFilm'){
            state.currentFilms.splice(array[0], 1);
            await DB.sendData('films/currentFilms', state.currentFilms);
         } else{
            state.futureFilms.splice(array[0], 1);
            await DB.sendData('films/futureFilms', state.futureFilms);
         }
      }
   },
   state: {
      currentFilms: list.list,
      futureFilms: listFuture.list
   },
   getters:{
      getCurrentFilms(state){
         return state.currentFilms
      },
      getFutureFilms(state){
         return state.futureFilms
      }
   },
   actions: {
      downloadFilms(context,type){
        context.commit('downloadFilmsType', type);
      },
      saveFilm(context, array){
         context.commit('changeFilm', array);
      },
      newFilm(context, array){
         context.commit('addNewFilm', array)
      },
      deleteFilmItem(context, array){
         context.commit('deleteFilm', array)
      }
   },
}