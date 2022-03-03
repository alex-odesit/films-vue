import DB from "../../../firebase/index";
import router from "../../router/index";

export default {
   mutations: {
      async getPages(state, link) {
         let pagesDatabase = await DB.getData(link);
         if (pagesDatabase) {
            state.pages = pagesDatabase;
         }
      },
      async savePage(state, array) {
         state.pages[array[2]] = array[0];
         if (state.pages[array[2]].uk) {
            let dateUK = state.pages[array[2]].uk.date;
            state.pages[array[2]].uk.date = dateUK.toString();
         }
         let dateRU = state.pages[array[2]].ru.date;
         state.pages[array[2]].ru.date = dateRU.toString();
         await DB.sendData(array[1], array[0]).then(() => {
            router.push({ path: "/pages" });
         })
      },
      async addNewPage(state, item) {
         if (item.uk) {
            let dateUK = item.uk.date;
            item.uk.date = dateUK.toString();
         }
         let dateRU = item.ru.date;
         item.ru.date = dateRU.toString();
         state.pages.push(item);
         await DB.sendData('pages', state.pages).then(() => {
            router.push({ path: "/pages" });
         })
      },
      async deletePage(state, index){
         state.pages.splice(index, 1);
         await DB.sendData('pages', state.pages);
      }
   },
   state: {
      pages: []
   },
   getters: {
      getPagesRow(state) {
         return state.pages;
      }
   },
   actions: {
      getPages(context, link) {
         context.commit('getPages', link)
      },
      savePage(context, array) {
         context.commit('savePage', array)
      },
      addNewPage(context, item) {
         context.commit('addNewPage', item)
      },
      deletePage(context,index){
         context.commit('deletePage', index);
      }
   },
};
