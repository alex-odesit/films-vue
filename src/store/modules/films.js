import list from './filmArray'
import DB from '../../../firebase/index'

export default{
   mutations: {
      async downloadFilmsType(state, type){
         let test = await DB.getData(type);
         state.currentFilms = test;
      }
   },
   state: {
      currentFilms: list.list,
      currentPage: 1
   },
   getters:{
      getCurrentFilms(state){
         return state.currentFilms
      },
   },
   actions: {
      downloadFilms(context,type){
         context.commit('downloadFilmsType', type);
      }
   },
}