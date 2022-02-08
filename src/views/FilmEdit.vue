<template>
   <div class="wrapper-film-edit">
      <div class="wrapper-input">
         <span>
             Название фильма
         </span>
         <input type="text" placeholder="Название фильма">
         {{date}}
      </div>
   </div>
</template>

<script>
export default {
   props:['date'],
   computed:{
      index(){
         return this.$route.params['id']
      }
   },
   mounted(){
      console.log(this.$route);
   }
}


</script>


<style scoped lang="scss">

</style>