import list from './filmArray'
import DB from '../../../firebase/index'

export default{
   mutations: {
      async downloadFilmsType(state, type){
         try{
            state.currentFilms = await DB.getData(type);
         } catch(err){
            console.log(err);
         }
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
      }
   },
}