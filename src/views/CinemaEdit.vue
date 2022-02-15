<template>
   <div class="wrapper-content">
      <div class="input-wrapper">
         <span>
            Название кинотетра
         </span>
         <input type="text" placeholder="Название кинотетра" v-model="cinema.nameCinema">
      </div>
      <div class="input-wrapper">
         <span>
            Описание
         </span>
         <textarea placeholder="Текст" v-model="cinema.description" ></textarea>
      </div>
      <div class="input-wrapper">
         <span>
            Условия
         </span>
         <textarea placeholder="Текст" v-model="cinema.if" ></textarea>
      </div>
      <div class="input-wrapper">
         <span>
            Условия
         </span>
         <oneImage
            @changeimagePreview="changeimagePreviewLogo"
            @changeShowPreview="changeShowPreviewTrueLogo"
            @changeFile="changeFileLogo"
            :imagePreview="cinema.imagePreviewLogo"
            :showPreview="cinema.showPreviewLogo"
            :file="cinema.fileLogo"
            :databaselink="`cinema/${index}/imagePreviewLogo`"
            :save="false"
         />
      </div>
      <div class="input-wrapper">
         <span>
            Фото верхнего баннера
         </span>
         <oneImage
            @changeimagePreview="changeimagePreviewBack"
            @changeShowPreview="changeShowPreviewTrueBack"
            @changeFile="changeFileBack"
            :imagePreview="cinema.imagePreviewBack"
            :showPreview="cinema.showPreviewBack"
            :file="cinema.fileBack"
            :databaselink="`cinema/${index}/imagePreviewBack`"
            :save="false"
         />
      </div>
      <span class="title">
         Галерея картинок
      </span>
      <div class="input-wrapper">
         <span>
            Размер: 1000x190 
         </span>
         <BigRow
            :isText="false"
            :isUrl="false"
            :download="true"
            :lists="cinema.list"
            :databaseLink="`cinema/${index}/list`"
            :index="String(index)"
            @changeList="changeList"
         />
      </div>
      <rowHalls 
         :cinema="cinema"
      />
      <div class="seo-wrapper">
      <span class="seo-wrapper-title"> SEO блок </span>
      <div class="seo-input-wrapper">
        <div class="input-wrapper input-wrapper_URL">
          <span> URL: </span>
          <input v-model="cinema.url" placeholder="URL" />
        </div>
        <div class="input-wrapper input-wrapper_title">
          <span> Title: </span>
          <input v-model="cinema.title" placeholder="Title" />
        </div>
        <div class="input-wrapper input-wrapper_words">
          <span> Keywords: </span>
          <input v-model="cinema.keywords" placeholder="Keywords" />
        </div>
        <div class="input-wrapper input-wrapper_seo-description">
          <span> Description: </span>
          <textarea
            placeholder="seoDescription"
            v-model="cinema.seoDescription"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="btn-save">
      <button @click="saveCinemaItem">
         Сохранить <load v-if="isSave" class="load"/>
      </button>
   </div>
   </div>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'
import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import load from '../components/Load.vue';
import rowHalls from '../components/cinemas/HallRow'

export default {
   components:{
      oneImage,
      BigRow,
      load,
      rowHalls
   },
   data:() =>({
      cinema: {
         id: 0,
         nameCinema: 'Новый кинотеатр',
         fileLogo: {},
         showPreviewLogo: false,
         imagePreviewLogo: '',
         description: '',
         if: '',
         fileBack: {},
         showPreviewBack: false,
         imagePreviewBack: '',
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
         url: "",
         title: "",
         keywords: "",
         seoDescription: "",
         
      },
      isSave: false
   }),
   methods:{
      ...mapActions(['downloadCinemas','saveCinema','addCinema']),
      getData(){
         if(this.index !== 'new'){
            this.downloadCinemas('cinema')
            this.cinema = this.getCinemas[this.index];
            console.log(this.getCinemas);
         }
      },
      changeFileLogo(file) {
         this.cinema.fileLogo = file;
      },
      changeShowPreviewTrueLogo(bool) {
         this.cinema.showPreviewLogo = bool;
      },
      changeimagePreviewLogo(imagePreview) {
         this.cinema.imagePreviewLogo = imagePreview;
      },
      changeFileBack(file) {
         this.cinema.fileBack = file;
      },
      changeShowPreviewTrueBack(bool) {
         this.cinema.showPreviewBack = bool;
      },
      changeimagePreviewBack(imagePreview) {
         this.cinema.imagePreviewBack = imagePreview;
      },
      changeList(list) {
         this.cinema.list = list;
      },
      saveCinemaItem(){
         this.isSave = true;
         if(this.index == 'new'){
            this.addCinema(this.cinema);
         }else{
            this.saveCinema([this.index, this.cinema]);
         }
      }
   },
   computed:{
      ...mapGetters(['getCinemas']),
      index(){
         return this.$route.params.id;
      },
   },
   mounted(){
      this.getData();
   }
}
</script>

<style scoped lang="scss">

.wrapper-content {
   padding: 50px;
}
.input-wrapper {
   display: flex;
   span{
      display: block;
      flex: 0 0 150px;
   }
   input{
      width: 300px;
   }
   margin-bottom: 20px;
}
textarea{
   width: 100%;
   height: 80px;
   resize: none;
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
         flex: 0 0 100%;
      }
      textarea{
         flex: 0 0 100%;
      }
   }
}
.btn-save{
   display: flex;
   justify-content: center;
   button{
      position: relative;
   }
}
.load{
  position: absolute;
  top: 0;
  right: 0;
}
</style>