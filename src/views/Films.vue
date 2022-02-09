<template>
   <div class="wrapper-films">
      <div class="titles">
         Список фильмов текущих
      </div>
     <div class="current-films-row">
         <Item
            v-for="(item,index) in getCurrentFilms"
            :key="item.id"
            class="item"
            :item="item"
            :indexFilm="index"
         />
         <router-link tag="div" to="/films/currentFilm/new">
            <button class="btn">Добавить фильм</button>
         </router-link>
      </div> 
   </div>
  
</template>


<script>
import Item from "@/components/films/FilmItem";

import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    Item
  },
  computed: {
     ...mapGetters(['getCurrentFilms'])
  },
  methods:{
     ...mapActions(['downloadFilms']),
     getData(){
        this.downloadFilms('films/currentFilms')
     }
  },
  mounted(){
     this.getData();
  }
};
</script>

<style scoped lang="scss">
.current-films-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.item {
  width: 200px;
  height: 230px;
  margin-right: 50px;
  margin-bottom: 45px;
}
.btn {
  height: 40px;
  background: rgb(190, 179, 179);
}

.wrapper-films {
   padding: 50px 100px 0px 100px;
}
.titles {
   text-align: center;
   font-size: 30px;
   font-weight: 700;
   margin-bottom: 50px;
}
</style>