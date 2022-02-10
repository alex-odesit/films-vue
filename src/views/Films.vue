<template>
   <div>
      <div class="fims-wrapper">
         <h2>
            Список фильмов текущих
         </h2>
         <row
            :current="true"
            :type="'currentFilm'"
         />
      </div>
      <div class="fims-wrapper">
         <h2>
            Список фильмов, которые покажут скоро
         </h2>
         <row
            :current="false"
            :type="'futureFilm'"
         />
      </div>
   </div>
</template>


<script>

import row from '../components/films/FilmsRow.vue'

export default {
   components:{
      row
   }
}
</script>


<style scoped lang="scss">
.fims-wrapper{
   h2{
      text-align: center;
      font-weight: 700;
   }
   &:not(:first-child){
      h2{
        margin-top: 70px; 
      }
      
   }
}
</style>