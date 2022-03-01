import DB from "../../../firebase/index";
import router from "../../router/index";
export default {
   mutations: {
      async getNewsRow(state, link){
         const news = await DB.getData(link);
         if (news){
            state.news = news;
         }
      },
      async addNewNew(state,array){
         state.news.push(array[0]);
         let dateRU = state.news[state.news.length - 1].ru.date;
         let dateUK = state.news[state.news.length - 1].uk.date;
         state.news[state.news.length - 1].ru.date = dateRU.toString();
         state.news[state.news.length - 1].uk.date = dateUK.toString();
         await DB.sendData(array[1], state.news).then(() => {
            router.push({ path: "/news" });
         });
      },
      async saveNew(state, array){
         state.news[array[1]] = array[0];
         let dateRU = state.news[array[1]].ru.date;
         let dateUK = state.news[array[1]].uk.date;
         state.news[array[1]].ru.date = dateRU.toString();
         state.news[array[1]].uk.date = dateUK.toString();
         await DB.sendData(`${array[2]}/${array[1]}`, state.news[array[1]]).then(() => {
            router.push({ path: "/news" });
         });
      },
      async deleteNewItem(state, index){
         state.news.splice(index,1);
         await DB.sendData('news', state.news);
      }
   },
   state: {
      news: []
   },
   getters: {
     getNewsRow(state){
        return state.news;
     }
   },
   actions: {
      getNews(context, link){
         context.commit('getNewsRow', link)
      },
      addNew(context, array){
         context.commit('addNewNew', array);
      },
      saveItem(context, array){
         context.commit('saveNew', array)
      },
      deleteNew(context, index){
         context.commit('deleteNewItem', index);
      }
   },
};
