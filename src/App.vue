<template>
  <div id="app">
    <Main/>
    <!-- <router-view /> -->
  </div>
</template>


<script>
import Main from './loyuots/Main'
import DB from '../firebase/index';
import { mapActions} from 'vuex'
export default {
  
  components:{
    Main
  },
  methods:{
      ...mapActions(['downloadDatas']),
      async downloadData(){
        try{
          const test = await DB.getArray('films/currentFilms');
          this.downloadDatas(test);
        }
         catch(arr){
           console.log(arr);
         }
      }
   },
  beforeMount(){
      this.downloadData()
   }
}
</script>
<style lang="scss">

</style>
