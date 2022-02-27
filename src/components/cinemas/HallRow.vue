<template>
  <div class="row-wrapper">
    <h2 class="title">{{ $t('listHallsTitle') }}</h2>
    <div class="row-box">
      <div class="hall">
        <div class="hall-item">{{ $t('nameHall') }}</div>
        <div class="hall-item">{{ $t('dateCreateHall') }}</div>
      </div>
      <item
        v-for="(item, index) in halls"
        :item="item"
        :key="index"
        class="item"
        :index="index"
        :cinema="cinema"
        :halls="halls"
        @removeHall="removeHall"
      />
      <button @click="addHall" class="btn">{{ $t('addHall') }}</button>
    </div>
  </div>
</template>

<script>
import item from "../cinemas/HallItem";
import { mapActions } from "vuex";

export default {
  components: {
    item,
  },
  props: ["halls", "cinema", "index"],
  methods: {
    ...mapActions(["timeSave"]),
    addHall() {
      this.timeSave(this.cinema);
      this.$router.push({ path: `/cinemas/cinema/${this.index}/hall/new` });
    },
    removeHall(index) {
      this.$emit("removeHall", index);
    },
  },
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
  width: 850px;
  font-size: 18px;
  text-align: center;
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
.item {
  &:nth-child(1n) {
    background-color: rgb(187, 186, 186);
  }
  &:nth-child(2n) {
    background-color: rgb(221, 221, 221);
  }
}
.btn {
  margin: 20px 10% 0px 0px;
  background-color: rgb(143, 142, 142);
}
</style>
