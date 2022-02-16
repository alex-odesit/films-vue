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
      async addNewCinema(state, cinema) {
         if (state.list.length !== 0) {
            cinema.id = String(Number(state.list[state.list.length - 1].id) + 1);
         } else cinema.id = '0';
         state.list.push(cinema);
         await DB.sendData('cinema', state.list).then(() => {
            router.push({ path: '/cinemas' });
         })
      },
      async changeCinema(state, array) {
         state.list[array[0]] = array[1];
         await DB.sendData(`cinema/${array[0]}`, state.list[array[0]]).then(() => {
            router.push({ path: '/cinemas' });
         });
      },
      addNewHall(state, array){
         if (array[1] !== 'new'){
            array[0].id = String(Number(state.list[array[1]].halls[state.list[array[1]].halls.length - 1].id) + 1);
         }else{
            array[0].id = state.timeCinema.halls.length+1;
         }
         let date = new Date();
         let day = date.getDate() < 10 ? '0' + `${date.getDate()}` : date.getDate();
         let month = date.getMonth() + 1 < 10 ? '0' + `${date.getMonth() + 1}` : date.getMonth() + 1;
         array[0].date = `${day}.${month}.${date.getFullYear()}`;
         state.timeCinema.halls.push(array[0]);
         router.push({ path: `/cinemas/cinema/${array[1]}/edit`});
      },
      saveHallItem(state,array){
         state.timeCinema.halls[array[2]] = array[0];
         router.push({ path: `/cinemas/cinema/${array[1]}/edit`});
      },
      timeSaveItem(state, cinema){
         state.timeCinema = cinema;
      },
      async downloadHallAndCinema(state, link){
         await DB.getData(link).then((cinema) => {
            state.timeCinema = cinema;
         });
      },
    },
   state: {
      list: listCinemas.listCinemas,
      timeCinema:{}
    },
   getters: { 
      getCinemas(state){
         return state.list;
      },
      getTimeCinema(state){
         return state.timeCinema
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
      },
      addHall(context,array){
         context.commit('downloadCinemasAll', 'cinema');
         context.commit('addNewHall', array);
      },
      saveHall(context, array){
         context.commit('downloadCinemasAll', 'cinema');
         context.commit('saveHallItem', array);
      },
      timeSave(context, cinema){
         context.commit('timeSaveItem', cinema);
      },
      downloadHall(context,link){
         context.commit('downloadHallAndCinema', link);
      }
   },
}