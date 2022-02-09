<template>
   <div class="wrapper-popap">
      <div class="wrapper-content">
         <span class="title">
            Вы действительно хотите отменить изменения?
         </span>
         <div class="wrapper-button">
            <button @click="noDeleteData">
               Нет
            </button>
            <button @click="deleteData">
               Отменить изменения
            </button>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   methods:{
      noDeleteData(){
         this.$emit('noDeleteData');
      },
      deleteData(){
         this.$emit('deleteData');
      }
   }
}
</script>


<style scoped lang='scss'>
.wrapper-popap{
   width: 100%;
   height: 100%;
   background: rgba(97, 97, 97, 0.623);
   display: flex;
   justify-content: center;
   align-items: flex-end;
}
.wrapper-content {
   width: 700px;
   height: 300px;
   background-color: rgba(0, 0, 0, 0.788);
   color: #fff;
   margin-bottom: 250px;
   padding: 50px;
   display: flex;
   flex-direction: column;
   align-items: center;
}
.title {
   font-size: 30px;
}
.wrapper-button {
   display: flex;
   justify-content: center;
   margin-top: 50px;
   button{
      color: #000;
      font-size: 18px;
      &:first-child{
         margin-right: 40px;
      }
   }
   width: 50%;
}
</style>