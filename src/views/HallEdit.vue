<template>
   <div class="wrapper-content">
      <div class="input-wrapper">
         <span>
            Номер зала
         </span>
         <input type="text" placeholder="Название кинотетра" v-model="hall.name">
      </div>
      <div class="input-wrapper">
         <span>
            Описание зала
         </span>
         <textarea placeholder="Текст" v-model="hall.description" ></textarea>
      </div>
      <div class="input-wrapper">
         <span>
            Схема зала
         </span>
         <oneImage
            @changeimagePreview="changeimagePreviewChem"
            @changeShowPreview="changeShowPreviewTrueChem"
            @changeFile="changeFileChem"
            :imagePreview="hall.imagePreviewChem"
            :showPreview="hall.showPreviewChem"
            :file="hall.fileChem"
            :databaselink="`cinema/${id}/halls/${index}/imagePreviewChem`"
            :save="false"
         />
      </div>
      <div class="input-wrapper">
         <span>
            Верхний баннер
         </span>
         <oneImage
            @changeimagePreview="changeimagePreviewBaner"
            @changeShowPreview="changeShowPreviewTrueBaner"
            @changeFile="changeFileBaner"
            :imagePreview="hall.imagePreviewBaner"
            :showPreview="hall.showPreviewBaner"
            :file="hall.fileBaner"
            :databaselink="`cinema/${id}/halls/${index}/imagePreviewBaner`"
            :save="false"
         />
      </div>
      <div class="input-wrapper">
         <span>
            Размер: 1000x190 
         </span>
         <BigRow
            :isText="false"
            :isUrl="false"
            :download="false"
            :lists="hall.list"
            :databaseLink="`cinema/${id}/halls/${index}/list`"
            :index="String(index)"
            @changeList="changeList"
         />
      </div>
      <div class="seo-wrapper">
         <span class="seo-wrapper-title"> SEO блок </span>
         <div class="seo-input-wrapper">
         <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="hall.url" placeholder="URL" />
         </div>
         <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="hall.title" placeholder="Title" />
         </div>
         <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="hall.keywords" placeholder="Keywords" />
         </div>
         <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
               placeholder="seoDescription"
               v-model="hall.seoDescription"
            ></textarea>
         </div>
         </div>
      </div>
      <div class="btn-save">
         <button @click="save">
            Сохранить <load v-if="isSave" class="load"/>
         </button>
      </div>
   </div>
</template>


<script>

import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import load from '../components/Load.vue';

import {mapGetters, mapActions} from 'vuex';

export default {
   components:{
      oneImage,
      BigRow,
      load
   },
   data:()=>({
      hall:{
         id: 1,
         name:'Новый зал',
         description:'',
         imagePreviewChem:'',
         fileChem:'',
         showPreviewChem:false,
         imagePreviewBaner:'',
         showPreviewBaner:false,
         fileBaner:'',
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
         url:'',
         title:'',
         keywords:'',
         seoDescription:'',
         date: '000000'
      },
      isSave:false,
      isWatch:false
   }),
   watch:{
      getTimeCinema: function(){
         this.hall = this.getTimeCinema.halls[this.index];
         this.isWatch = false;
      }
   },
   methods:{
      ...mapActions(['downloadHall','addHall','saveHall']),
      getData(){
         if(this.index !== 'new'){
            if(this.getTimeCinema.id == 0 || this.getTimeCinema.id){
              this.hall = this.getTimeCinema.halls[this.index]; 
            }else{
               this.isWatch = true;
               this.downloadHall(`cinema/${this.id}`);
            }
         }
      },
      changeFileChem(file) {
         this.hall.fileChem = file;
      },
      changeShowPreviewTrueChem(bool) {
         this.hall.showPreviewChem = bool;
      },
      changeimagePreviewChem(imagePreview) {
         this.hall.imagePreviewChem = imagePreview;
      },
      changeFileBaner(file) {
         this.hall.fileBaner= file;
      },
      changeShowPreviewTrueBaner(bool) {
         this.hall.showPreviewBaner = bool;
      },
      changeimagePreviewBaner(imagePreview) {
         this.hall.imagePreviewBaner = imagePreview;
      },
      changeList(list) {
         this.hall.list = list;
      },
      save(){
         this.isSave = true;
         if(this.index == 'new'){
            this.addHall([this.hall,this.id]);
         }else{
            this.saveHall([this.hall,this.id, this.index]);
         }
      }
   },
   computed:{
      id(){
         return this.$route.params.id;
      },
      index(){
         return this.$route.params.index;
      },
      ...mapGetters(['getTimeCinema'])
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