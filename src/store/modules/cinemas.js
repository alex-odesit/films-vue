import listCinemas from './cinemasArray'

import DB from '../../../firebase/index'

import router from '../../router/index'


export default {
   mutations: {
      async deleteItem(state, index){
         state.list.splice(index,1);
         await DB.sendData('cinema', state.list);
      },
      async downloadCinemasAll(state, link){
         await DB.getData(link).then((cinemas) =>{
            if (!cinemas) {
               state.list = [];
            } else{
               state.list = cinemas;
            }
         });
         
         
      },
      async changeCinema(state, array) {
         state.list[array[0]] = array[1];
         await DB.sendData(`cinema/${array[0]}`, state.list[array[0]]).then(() => {
            router.push({ path: '/cinemas' });
         });
      },
      async addNewCinema(state, cinema){
         if (state.list.length !== 0) {
            cinema.id = String(Number(state.list[state.list.length - 1].id) + 1);
         } else cinema.id = String(state.list.length);
         state.list.push(cinema);
         await DB.sendData('cinema', state.list).then(() => {
            router.push({ path: '/cinemas' });
         })
      }
    },
   state: {
      list: listCinemas.listCinemas
    },
   getters: { 
      getCinemas(state){
         return state.list
      }
   },
   actions: {
      deleteCinemaItem(context,index){
         context.commit('deleteItem', index);
      },
      downloadCinemas(context, link) {
         context.commit('downloadCinemasAll', link);
      },
      saveCinema(context, array) {
         context.commit('changeCinema', array);  
      },
      addCinema(context, cinema){
         context.commit('addNewCinema', cinema);  
      }
   },
}