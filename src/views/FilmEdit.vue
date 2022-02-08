<template>
   <div class="item-film-wrapper">
      language  {{typeFilm}}
      <div class="input-wrapper input-wrapper_name">
         <span>
            Название фильма
         </span>
         <input type="text" placeholder="Название фильма" v-model="film.nameFilm">
      </div>
      <div class="input-wrapper input-wrapper_description">
         <span>
            Описание
         </span>
         <textarea  v-model="film.description" placeholder="Текст"></textarea>
      </div>
      <div class="input-wrapper input-wrapper_mainImg">
         <span>
            Главная картинка
         </span>
         <oneImage
         @changeimagePreview='changeimagePreview' 
         @changeShowPreview='changeShowPreviewTrue' 
         @changeFile='changeFile' 
         :imagePreview='film.imagePreview' 
         :showPreview='film.showPreview' 
         :file='film.file'
         :storageLink='film.storageLink'
         :databaselink="film.databaselink+currentIndex+'/imagePreview'"
         :save='false'/>
      </div> 
      <span class="gallery-images">
         Галерея картинок
      </span>
      <div class="input-wrapper input-wrapper_imagesRow">
         <span>
            Размер: 1000x190
         </span>
         <BigRow :isText="false" :isUrl="false" :lists="film.list"/>
      </div>
      <div class="input-wrapper input-wrapper_linkTreyler">
         <span>
            Ссылка на трейлер
         </span>
         <input v-model="film.linkTreyler" placeholder="Ссылка на видео в youtube"/>
      </div>
      <div class="input-wrapper input-wrapper_checkBox">
         <span>
            Тип кино
         </span>
         <div class="checkBox-wrapper">
            <div class="input-item">
               <span>
                  3D
               </span>
               <input type="checkbox" v-model="film.threeD">
            </div>
            <div class="input-item">
               <span>
                  2D
               </span>
               <input type="checkbox" v-model="film.twooD">
            </div>
            <div class="input-item">
               <span>
                  IMAX
               </span>
               <input type="checkbox" v-model="film.imax">
            </div>
         </div>
      </div>
      <div class="seo-wrapper">
         <span class="seo-wrapper-title">
            SEO блок
         </span>
         <div class="seo-input-wrapper">
            <div class="input-wrapper input-wrapper_URL">
               <span>
                  URL:
               </span>
               <input v-model="film.url" placeholder="URL"/>
            </div>
            <div class="input-wrapper input-wrapper_title">
               <span>
                  Title:
               </span>
               <input v-model="film.title" placeholder="Title"/>
            </div>
            <div class="input-wrapper input-wrapper_words">
               <span>
                  Keywords:
               </span>
               <input v-model="film.keywords" placeholder="Keywords"/>
            </div>
            <div class="input-wrapper input-wrapper_seo-description">
               <span>
                  Description:
               </span>
               <textarea placeholder="seoDescription" v-model="film.seoDescription"></textarea>
            </div>
         </div>
      </div>
      <div class="buttons-wrapper">
         <router-link tag="div" to='/films' >
            <button @click="saveContent">
               Сохранить
            </button>
         </router-link>
         <button>
            Вернуть базовою версию
         </button>
      </div>
   </div>
</template>


<script>

import {mapGetters, mapActions} from 'vuex';
import oneImage from '../components/addImageOne.vue';
import BigRow from "@/components/BigRow";

export default {
   props: ['typeFilm'],
   components:{
      oneImage,
      BigRow
   },
   methods:{
      ...mapActions(['saveFilm','addNewFilm','addChangePage']),
      changeFile(file){
         this.film.file = file;
      },
      changeShowPreviewTrue(bool){
         this.film.showPreview = bool;
      },
      changeimagePreview(imagePreview){
         this.film.imagePreview = imagePreview;
      },
      saveContent(){
         this.saveFilm(this.film);
      }
   },
   data: () =>({
      film:{
         nameFilm :'',
         description: '',
         file: {},
         showPreview: false,
         imagePreview: "",
         storageLink:'images/film/mainImg',
         databaselink:'films/currentFilms/',
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
         linkTreyler:'',
         threeD: true,
         twooD: false,
         imax: true,
         url: '',
         title: '',
         keywords: '',
         seoDescription: ''
      }
   }),
   computed: {
      ...mapGetters(['getCurrentFilms','getCurrentFilm']),
      currentIndex(){
         return this.getCurrentFilms.indexOf(this.getCurrentFilm);
      }
   },
   mounted(){
      this.film = this.getCurrentFilm;
   },
}
</script>



<style scoped  lang="scss">
textarea{
   resize: none;
   height: 100px;
   width: 100%;
}
.item-film-wrapper {
   padding: 50px;
   font-size: 18px;
}
.input-wrapper {
   span{
      margin-right: 30px;
   }
   margin-bottom: 30px;
}
.input-wrapper_description {
   display: flex;
}
.input-wrapper_mainImg {
   display: flex;
}
.gallery-images {
   margin: 30px 0px 50px 0px;
}
.input-wrapper_imagesRow {
   display: flex;
}
.input-wrapper_linkTreyler {
   display: flex;
   span{
      flex: 0 0 200px;
   }
   input{
      width: 100%;
   }
}
.input-wrapper_checkBox {
   display: flex;
}
.checkBox-wrapper {
   display: flex;
   span{
      margin-right: 3px;
   }
}
.input-item {
   margin-right: 40px;
}
.seo-input-wrapper{
   width: 100%;
}
.seo-wrapper-title{
   margin-right: 100px;
}
.seo-wrapper {
   display: flex;
   .input-wrapper{
      display: flex;
      span{
         flex: 0 0 100px;
         text-align: right;
         margin-right: 10px;
      }
      input{
         flex: 0 1 100%;
      }
      textarea{
         flex: 0 1 100%;
      }
   }
}
.input-wrapper_URL {
}
.input-wrapper_title {
}
.input-wrapper_words {
}
.input-wrapper_seo-description {
}
.buttons-wrapper {
   display: flex;
   justify-content: center;
   button{
      border-radius: 7px;
      &:first-child{
         margin-right: 40px;
      }
   }
}
</style>