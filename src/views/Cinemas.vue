<template>
  <div class="wrapper-row">
    <items
      class="item"
      v-for="(item, index) in getCinemas"
      :key="item.id"
      :index="index"
      :item="item"
      :length="getCinemas.length"
    />
    <button class="btn" @click="addCinema">Добавить</button>
  </div>
</template>

<script>
import items from "../components/cinemas/CinemaItem";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    items,
  },
  computed: {
    ...mapGetters(["getCinemas"]),
  },
  methods: {
    ...mapActions(["downloadCinemas"]),
    getData() {
      this.downloadCinemas("cinema");
    },
    addCinema() {
      this.$router.push({ path: "/cinemas/cinema/new" });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="scss">
.item {
  width: 180px;
  height: 120px;
  margin-right: 50px;
  margin-bottom: 45px;
}
.wrapper-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.btn {
  margin-bottom: 40px;
  background-color: rgb(65, 65, 65);
  color: #fff;
}
</style>
