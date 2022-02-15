<template>
  <div class="row-wrapper">
    <h2 class="title">Список залов</h2>
    <div class="row-box">
      <div class="hall">
        <div class="hall-item">Название</div>
        <div class="hall-item">Дата создания</div>
      </div>
      <item/>
      <div class="hall hall-item-row">
        <div class="hall-item">Первый зал</div>
        <div class="hall-item">651651</div>
        <div class="font-awesome-box">
          <font-awesome-icon class="font-awesome" icon="fa-solid fa-pen" />
          <font-awesome-icon class="font-awesome" icon="fa-solid fa-trash" />
        </div>
      </div>
      <div class="hall hall-item-row">
        <div class="hall-item">Первый зал</div>
        <div class="hall-item">651651</div>
        <div class="font-awesome-box">
          <font-awesome-icon class="font-awesome" icon="fa-solid fa-pen" />
          <font-awesome-icon class="font-awesome" icon="fa-solid fa-trash" />
        </div>
      </div>
    </div>
    
  </div>
</template>



<script>
import item from "../cinemas/HallItem";

export default {
  components: {
    item
  },
  props:['cinema']
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
  .font-awesome {
    font-size: 22px;
  }
  .hall-item {
    padding: 10px;
    background-color: rgb(156, 156, 156);
    border: 1px solid #000;
    &:first-child {
      flex: 0 0 40%;
    }
    &:nth-child(2) {
      flex: 0 0 50%;
    }
  }
  &:nth-child(2) {
    .font-awesome-box {
      .font-awesome {
        &:last-child {
          display: none;
        }
      }
    }
  }
}

.hall-item-row {
  &:nth-child(1n) {
    .hall-item {
      background-color: rgb(201, 200, 200);
    }
  }
  &:nth-child(2n) {
    .hall-item {
      background-color: rgb(230, 227, 227);
    }
  }
}
.font-awesome-box {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .font-awesome {
    cursor: pointer;
    &:first-child {
      margin-left: 30px;
    }
  }
}
</style>