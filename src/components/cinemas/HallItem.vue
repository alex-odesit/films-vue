<template class="test">
  <div>
    <div class="hall hall-item-row">
        <div class="hall-item">
          {{item.name}}
        </div>
        <div class="hall-item">
          {{item.date}}
        </div>
        <div class="font-awesome-box">
          <font-awesome-icon class="font-awesome" icon="fa-solid fa-pen" />
          <font-awesome-icon v-if="index !== 0" class="font-awesome" icon="fa-solid fa-trash" />
        </div>
      </div>
  </div>
</template>
<script>


export default {
  props:['item','index']
};
</script>


<style scoped lang="scss">
.hall {
  display: flex;
  align-items: center;
}
.hall-item-row {
}
.hall-item {
  padding: 10px;
  border: 1px solid #000;
  &:first-child{
    flex: 0 0 40%;
  }
  &:nth-child(2){
    flex: 0 0 50%;
  }
}
.font-awesome-box {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  height: 47.7px;
  background-color: #fff;
  padding-top: 10px;
}
.font-awesome {
  font-size: 22px;
  cursor: pointer;
  &:first-child{
    margin-left: 30px;
  }
}
</style>