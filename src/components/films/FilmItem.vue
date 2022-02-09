<template>
   <div>
      <div class="wrapper">
         <div @click="removeFilm(indexFilm)" class="delete-film">

         </div>
         <router-link
            tag="div"
            class="img-wrapper"
            :to="{path: `films/currentFilm/${indexFilm}`}"
         >
            <img v-show="item.showPreview" :src="item.imagePreview" alt="">
         </router-link>
      </div>
      <div class="subtitle-wrapper">
         <span class="subtitle">
            {{item.nameFilm}}
         </span>
      </div>
   </div>
</template>


<script>

import { mapActions } from 'vuex'

export default {
   props:{
      item: Object,
      indexFilm: Number
   },
   methods:{
      ...mapActions(['deleteFilmItem']),
      removeFilm(index){
         this.deleteFilmItem(index);
      }
   }
}
</script>

<style scoped lang="scss">
.wrapper{
   position: relative;
   width: 100%;
   height: 100%;
   cursor: pointer;
   margin-bottom: 10px;
   overflow: visible;
}
.img-wrapper {
   position: absolute;
   width: 100%;
   height: 100%;
   background: #e6e6e6 url('../../assets/add-img.jpg') no-repeat 50% 50%/ 50% auto;
   img{
      position: absolute;
      width: 100%;
      height: 100%;
   }
}
.subtitle {
   font-size: 18px;
}
.subtitle-wrapper{
   text-align: center;
}
.delete-film{
   position: absolute;
   display: block;
   width: 26px;
   height: 26px;
   border: 3px solid #000;
   top: -12px;
   right: -12px;
   z-index: 100;
   cursor: pointer;
   border-radius: 50%;
   &::before{
      content: '';
      display: block;
      width: 18px;
      height: 3px;
      background: #000;
      position: absolute;
      transform: rotate(45deg);
      top: 8px;
   }
   &::after{
      content: '';
      display: block;
      width: 18px;
      height: 3px;
      background: #000;
      position: absolute;
      transform: rotate(-45deg);
      top: 8px;
   }
}
</style>