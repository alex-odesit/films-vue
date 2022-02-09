<template>
  <div class="wrapper-film-edit">
    <div class="wrapper-input">
      <span> Название фильма </span>
      <input
        type="text"
        placeholder="Название фильма"
        v-model="film.nameFilm"
      />
    </div>
    <div class="wrapper-input">
      <span> Описание </span>
      <textarea v-model="film.description" placeholder="Текст"></textarea>
    </div>
    <div class="wrapper-input">
      <span> Главная картинка </span>
      <oneImage
        @changeimagePreview="changeimagePreview"
        @changeShowPreview="changeShowPreviewTrue"
        @changeFile="changeFile"
        :imagePreview="film.imagePreview"
        :showPreview="film.showPreview"
        :file="film.file"
        :databaselink="`films/currentFilms/${index}/imagePreview`"
        :save="false"
      />
    </div>
    <span class="subtitle"> Галерея картинок </span>
    <div class="wrapper-input wrapper-input-row">
      <span> Размер: 1000x190 </span>
      <BigRow
        :isText="false"
        :isUrl="false"
        :download="true"
        :lists="film.list"
        :databaseLink="`films/currentFilms/${index}/list`"
        :index="String(index)"
        @changeList="changeList"
      />
    </div>
    <div class="wrapper-input wrapper-input-treyler">
      <span> Ссылка на трейлер </span>
      <input
        type="text"
        placeholder="Ссылка на видео в youtube"
        v-model="film.linkTreyler"
      />
    </div>
    <div class="input-wrapper input-wrapper_checkBox">
      <span> Тип кино </span>
      <div class="checkBox-wrapper">
        <div class="input-item">
          <span> 3D </span>
          <input type="checkbox" v-model="film.threeD" />
        </div>
        <div class="input-item">
          <span> 2D </span>
          <input type="checkbox" v-model="film.twooD" />
        </div>
        <div class="input-item">
          <span> IMAX </span>
          <input type="checkbox" v-model="film.imax" />
        </div>
      </div>
    </div>
    <div class="seo-wrapper">
      <span class="seo-wrapper-title"> SEO блок </span>
      <div class="seo-input-wrapper">
        <div class="input-wrapper input-wrapper_URL">
          <span> URL: </span>
          <input v-model="film.url" placeholder="URL" />
        </div>
        <div class="input-wrapper input-wrapper_title">
          <span> Title: </span>
          <input v-model="film.title" placeholder="Title" />
        </div>
        <div class="input-wrapper input-wrapper_words">
          <span> Keywords: </span>
          <input v-model="film.keywords" placeholder="Keywords" />
        </div>
        <div class="input-wrapper input-wrapper_seo-description">
          <span> Description: </span>
          <textarea
            placeholder="seoDescription"
            v-model="film.seoDescription"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="buttons-wrapper">
      <router-link tag="div" to='/films' >
         <button @click="saveData">
            Сохранить
         </button>
      </router-link>
      <template v-if="howButton">
         <button @click="resaveData">
            Вернуть базовою версию
         </button>
      </template>
      <template v-else>
         <router-link tag="div" to='/films' >
            <button>
               Не добавлять новый фильм
            </button>
         </router-link>
      </template>
      
   </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";

import DB from '../../firebase/index';

export default {
  components: {
    oneImage,
    BigRow,
  },
  data: () => ({
    film: {
      id: 1,
      nameFilm: "новый фильм",
      description: "",
      file: {},
      showPreview: false,
      imagePreview: "",
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
      linkTreyler: "",
      threeD: false,
      twooD: false,
      imax: false,
      url: "",
      title: "",
      keywords: "",
      seoDescription: "",
      urlMain: "",
    },
  }),
  computed: {
    index() {
      return this.$route.params["id"];
    },
    howButton(){
       return this.index !== 'new';
    },
    ...mapGetters(["getCurrentFilms"]),
  },
  methods: {
    ...mapActions(["downloadFilms","saveFilm","newFilm"]),
    getData() {
      if(this.index !== 'new'){
         this.downloadFilms("films/currentFilms");
         this.film = this.getCurrentFilms[this.index];
      }
    },
    changeFile(file) {
      this.film.file = file;
    },
    changeShowPreviewTrue(bool) {
      this.film.showPreview = bool;
    },
    changeimagePreview(imagePreview) {
      this.film.imagePreview = imagePreview;
    },
    changeList(list) {
      this.film.list = list;
    },
    saveData(){
      if(this.index !== 'new'){
         this.saveFilm([this.index,this.film]);
      }else{
         this.newFilm(this.film);
      }
      
    },
    async resaveData(){
       try{
         let databaseFilm = await DB.getData(`films/currentFilms/${this.index}`);
         if(databaseFilm){
            this.film = databaseFilm;
         }else{
            console.log('Доделать');
         }
       }catch(err){
         console.log(err);
       }
    }
  },
   mounted() {
      this.getData();
   },
};
</script>


<style scoped lang="scss">
.wrapper-film-edit {
  padding: 50px;
}
.wrapper-input {
  display: flex;
  margin-bottom: 20px;
  span {
    margin-right: 20px;
  }
  input{
     width: 300px;
  }
}
textarea{
   resize: none;
   width: 100%;
   height: 70px;
}
.wrapper-input-row{
   margin-top: 30px;
}
.wrapper-input-treyler{
   span{
      display: block;
      flex: 0 0 15%;
   }
   input{
      flex: 0 0 85%;
   }
}
.input-wrapper_checkBox {
   display: flex;
   span{
      margin-right: 50px;
   }
   margin-bottom: 40px;
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
   flex: 0 0 100px;
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
.buttons-wrapper {
   margin-top: 25px;
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