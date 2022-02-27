<template>
  <div class="wrapper-films">
    <div class="current-films-row">
      <Item
        v-for="(item, index) in isCurrent"
        :key="index"
        class="item"
        :item="item"
        :indexFilm="index"
        :type="type"
      />
      <router-link tag="div" :to="`/films/${type}/new`">
        <button class="btn">Добавить фильм</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Item from "@/components/films/FilmItem";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Item,
  },
  props: ["current", "type"],
  computed: {
    ...mapGetters(["getCurrentFilms", "getFutureFilms"]),
    isCurrent() {
      return this.current ? this.getCurrentFilms : this.getFutureFilms;
    },
  },
  methods: {
    ...mapActions(["downloadFilms"]),
    getData() {
      if (this.type === "currentFilm") {
        this.downloadFilms("films/currentFilms");
      } else {
        this.downloadFilms("films/futureFilms");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="scss">
.current-films-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.item {
  width: 200px;
  height: 230px;
  margin-right: 50px;
  margin-bottom: 45px;
}
.btn {
  height: 40px;
  background: rgb(190, 179, 179);
}

.wrapper-films {
  padding: 50px 100px 0px 100px;
}
</style>
