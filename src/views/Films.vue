<template>
   <div>
      <row
         :current="true"
         :type="'currentFilm'"
      />
      <row
         :current="false"
         :type="'futureFilm'"
      />
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

</style>