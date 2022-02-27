<template>
  <div>
    <div class="wrapper">
      <div
        class="delete-film"
        :class="isDeleteCinema"
        @click="deleteCinema"
      ></div>
      <router-link
        tag="div"
        class="img-wrapper"
        :to="`/cinemas/cinema/${index}`"
      >
        <img
          v-show="item.ru.showPreviewBack"
          :src="item.ru.imagePreviewBack"
          alt=""
        />
      </router-link>
    </div>
    <div class="subtitle-wrapper">
      <span class="subtitle">
        {{ item.ru.nameCinema }}
      </span>
    </div>
    <popap
      @deleteData="resaveData"
      @noDeleteData="resaveDataClick"
      class="popap"
      :array="['Вы действительно хотите удалить кинотеатр?', 'Нет', 'Удалить']"
      :class="isActivePopap"
    />
  </div>
</template>

<script>
import popap from "../films/filmPopap";

import { mapActions } from "vuex";

export default {
  props: ["item", "index", "length"],
  components: {
    popap,
  },
  data: () => ({
    isPopap: false,
  }),
  computed: {
    isActivePopap() {
      return {
        "acive-popap": this.isPopap,
      };
    },
    isDeleteCinema() {
      return {
        "no-delete-cinema": this.length <= 1,
      };
    },
  },
  methods: {
    ...mapActions(["deleteCinemaItem"]),
    deleteCinema() {
      this.isPopap = true;
    },
    resaveData() {
      this.deleteCinemaItem(this.index);
      this.isPopap = false;
    },
    resaveDataClick() {
      this.isPopap = false;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-bottom: 10px;
  overflow: visible;
}
.img-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e6e6e6 url("../../assets/add-img.jpg") no-repeat 50% 50%/ 50% auto;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.subtitle {
  font-size: 18px;
}
.subtitle-wrapper {
  text-align: center;
}
.delete-film {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  border: 3px solid #000;
  top: -12px;
  right: -12px;
  z-index: 100;
  cursor: pointer;
  border-radius: 50%;
  &::before {
    content: "";
    display: block;
    width: 18px;
    height: 3px;
    background: #000;
    position: absolute;
    transform: rotate(45deg);
    top: 8px;
  }
  &::after {
    content: "";
    display: block;
    width: 18px;
    height: 3px;
    background: #000;
    position: absolute;
    transform: rotate(-45deg);
    top: 8px;
  }
}
.no-delete-cinema {
  display: none;
}
.popap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  z-index: 100;
}
.acive-popap {
  left: 0;
}
</style>
