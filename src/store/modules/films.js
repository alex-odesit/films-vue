import list from './filmArray'
import DB from '../../../firebase/index'

export default{
   mutations: {
      async downloadFilmsType(state, type){
         try{
            state.currentFilms = await DB.getData(type);
            if (!state.currentFilms){
               state.currentFilms = [];
            }
         } catch(err){
            console.log(err);
         }
      },
      async changeFilm(state, array){
         state.currentFilms[array[0]] = array[1];
         await DB.sendData(`films/currentFilms/${array[0]}`, state.currentFilms[array[0]]);
      },
      async addNewFilm(state,film){
         let newFilm = film;
         if (state.currentFilms.length !== 0){
            newFilm.id = String(state.currentFilms[state.currentFilms.length - 1].id+1);
         } else newFilm.id = String(state.currentFilms.length);
         state.currentFilms.push(newFilm);
         await DB.sendData('films/currentFilms', state.currentFilms);
      },
      async deleteFilm(state,index){
         state.currentFilms.splice(index, 1);
         await DB.sendData('films/currentFilms', state.currentFilms);
      }
   },
   state: {
      currentFilms: list.list
   },
   getters:{
      getCurrentFilms(state){
         return state.currentFilms
      },
   },
   actions: {
      downloadFilms(context,type){
        context.commit('downloadFilmsType', type);
      },
      saveFilm(context, array){
         context.commit('changeFilm', array)
      },
      newFilm(context, film){
         context.commit('addNewFilm', film)
      },
      deleteFilmItem(context, index){
         context.commit('deleteFilm', index)
      }
   },
}