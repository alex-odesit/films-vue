<template>
   <div class="row-wrapper">
      <h2 class="title">
         Список залов
      </h2>
      <div class="row-box">
         <div class="hall">
            <div class="hall-item">
               Название
            </div>
            <div class="hall-item">
               Дата создания
            </div>
         </div>
         <div class="hall hall-item-row">
            <div class="hall-item">
               Первый зал
            </div>
            <div class="hall-item">
               651651
            </div>
         </div>
      </div>
   </div>
</template>



<script>
export default {
   
}
</script>


<style scoped lang="scss">
.row-wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-bottom: 50px;
}
.title {
   text-align: center;
   font-weight: 700;
   font-size: 25px;
}
.row-box {
   width: 1000px;
   font-size: 18px;
}
.hall {
   display: flex;
   .hall-item {
      padding: 10px;
      background-color: rgb(156, 156, 156);
      border: 1px solid #000;
      &:first-child{
        flex: 0 0 40%;
      }
      &:last-child{
        flex: 0 0 50%;
      }
   }
}

.hall-item-row {
   &:nth-child(1n) {
      .hall-item{
         background-color: rgb(201, 200, 200);
      }
   }
   &:nth-child(2n) {
      .hall-item{
         background-color: rgb(230, 227, 227);
      }
   }
   
}
</style>