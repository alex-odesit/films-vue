<template>
  <div class="row-wrapper">
    <h2 class="title">Список залов</h2>
    <div class="row-box">
      <div class="hall">
        <div class="hall-item">Название</div>
        <div class="hall-item">Дата создания</div>
      </div>
      <item 
         v-for="(item,index) in halls"
         :item="item" 
         :key="index"
         class="item"
         :index="index"
      />
    </div>
  </div>
</template>



<script>
import item from "../cinemas/HallItem";

export default {
  components: {
    item
  },
  props:['halls']
};
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
  align-items: center;
  .hall-item {
    padding: 10px;
    background-color: rgb(145, 144, 144);
    border: 1px solid #000;
    &:first-child {
      flex: 0 0 40%;
    }
    &:nth-child(2) {
      flex: 0 0 50%;
    }
  }
}
.item{
   &:nth-child(1n){
      background-color: rgb(187, 186, 186);
   }
   &:nth-child(2n){
      background-color: rgb(221, 221, 221);
   }
   &:first-child{
      .font-awesome {
         display: none !important;
      }
   }
}
</style>