import list from './filmArray'
import DB from '../../../firebase/index'

export default{
   mutations: {
      updatePage(state, id){
         state.currentPage = id;
      },
      async saveCurrentFilm(state, film){
         const { getCurrentFilm } = this.getters;
         const index = state.currentFilms.indexOf(getCurrentFilm)
         state.currentFilms[index] = film;
         // await DB.deleteStorage(`images/film/currentFilms/${index}/main`);
         // await DB.deleteStorage(`images/film/currentFilms/${index}/list`);
         // state.currentFilms[index].urlMain = await DB.sendImg(`images/film/currentFilms/${index}/main/0`, state.currentFilms[index].file);
         // for (const indexItem in state.currentFilms[index].list) {
         //    state.currentFilms[index].list[indexItem].url = await DB.sendImg(`images/film/currentFilms/${index}/list/${indexItem}`, state.currentFilms[index].list[indexItem].file);
         // }
         await DB.sendData(`films/currentFilms`, state.currentFilms);
      },
      downloadFilms(state, test){
         state.currentFilms = test ? test : state.currentFilms;
      },
      addFilm(state, type){
         const newObj = {
            id: Math.random(),
            nameFilm: 'new Film',
            description: '',
            file: {},
            showPreview: false,
            imagePreview: '',
            storageLink: 'images/film/mainImg',
            databaselink: 'films/currentFilms/',
            list: [
               {
                  id: 1,
                  file: "",
                  showPreview: false,
                  imagePreview: "",
                  text: "",
                  url: "",
               },
            ],
            linkTreyler: '',
            threeD: false,
            twooD: false,
            imax: false,
            url: '',
            title: '',
            keywords: '',
            seoDescription: '',
            urlMain: ''
         }

         if (type === 'carrent'){
            state.currentFilms.push(newObj)
         }
         console.log(state);
      },
      async removeFilm(state,index){
         state.currentFilms.splice(index, 1);
         await DB.sendData(`films/currentFilms`, state.currentFilms);
      },
      changePageLast(state){
         state.currentPage = state.currentFilms[state.currentFilms.length-1].id;
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
      getCurrentFilm(state){
         return state.currentFilms.find(item => item.id === state.currentPage);
      },
      getLastItemId(state){
         return state
      }
   },
   actions: {
      changePage(context, id) {
         context.commit('updatePage', id)
      },
      saveFilm(context, film) {
         context.commit('saveCurrentFilm', film);
      },
      downloadDatas(context,test) {
         try{
            context.commit('downloadFilms', test);
         }catch(err){
            console.log(err);
         }
      },
      addNewFilm(context, type){
         context.commit('addFilm',type)
      },
      async remove(context, type) {
         await context.commit('removeFilm', type)
      },
      addChangePage(context){
         context.commit('changePageLast')
      }
   },
}