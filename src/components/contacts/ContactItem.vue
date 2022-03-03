<template>
  <div class="wrapper-component">
    <div class="delete" @click="deleteCinema"></div>
    <div class="input-check-wrapper" :class="activeStatus">
      <span @click="show"></span>
      <input type="checkbox" v-model="item.status" />
      <div class="input-check-title">
        {{ item.status ? "вкл" : "выкл" }}
      </div>
    </div>
    <div class="item-box">
      <span class="item-title"> Название кинотетра </span>
      <input
        type="text"
        v-model="item.nameCinema"
        placeholder="название кинотеатра"
      />
    </div>
    <div class="item-box">
      <span class="item-title"> Адрес </span>
      <textarea v-model="item.adress" placeholder="Адрес"></textarea>
    </div>
    <div class="item-box">
      <span class="item-title"> Координаты для карты </span>
      <input
        type="text"
        v-model="item.localeMap"
        placeholder="Координаты для карты"
      />
    </div>
    <div class="item-box">
      <span class="item-title"> Лого </span>
      <oneImage
        @changeimagePreview="changeImagePreview"
        @changeShowPreview="changeShowPreviewTrue"
        @changeFile="changeFile"
        :imagePreview="item.imagePreview"
        :showPreview="item.showPreview"
        :file="item.file"
        :databaselink="`pages/${index}/imagePreview`"
        :save="false"
        :download="false"
      />
    </div>
  </div>
</template>



<script>
import oneImage from "@/components/addImageOne.vue";

export default {
  props: ["item", "id"],
  components: {
    oneImage,
  },
  computed: {
    activeStatus() {
      return { active: this.item.status };
    },
    index() {
      return this.$route.params.id;
    },
  },
  methods: {
    show() {
      this.item.status = this.item.status ? false : true;
    },
    changeFile(file) {
      this.item.file = file;
    },
    changeShowPreviewTrue(bool) {
      this.item.showPreview = bool;
    },
    changeImagePreview(imagePreview) {
      this.item.imagePreview = imagePreview;
    },
    deleteCinema() {
      this.$emit("deleteCinema", this.id);
    },
  },
};
</script>



<style scoped lang="scss">
.wrapper-component {
  width: 90%;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 50px 50px 0px 50px;
  position: relative;
  margin-bottom: 20px;
}
.input-check-wrapper {
  position: absolute;
  right: 50px;
  top: 40px;
  input {
    display: none;
  }
  span {
    display: block;
    width: 40px;
    height: 22px;
    background-color: rgb(255, 255, 255);
    border: 1px solid #000;
    border-radius: 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      display: block;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background-color: #fff;
      border: 1px solid #000;
      transition: all 0.2s ease;
    }
  }
  &.active {
    span {
      background-color: rgb(13, 238, 13);
      border: 1px solid rgb(13, 238, 13);
      &::after {
        left: 20px;
        border: 1px solid rgb(255, 255, 255);
      }
    }
  }
}
.input-check-title {
  position: absolute;
  top: 0;
  right: 50px;
}
.item-box {
  display: flex;
  span {
    margin-right: 50px;
  }
  margin-bottom: 20px;
}
textarea {
  resize: none;
  width: 100%;
  height: 100px;
}
input {
  width: 50%;
}
.delete {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0px;
  top: 0px;
  border: 3px solid #000;
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;
  &::after {
    content: "";
    width: 16px;
    height: 3px;
    background-color: #000;
    position: absolute;
    top: 7px;
    right: 1px;
    transform: rotate(45deg);
  }
  &::before {
    content: "";
    width: 16px;
    height: 3px;
    background-color: #000;
    position: absolute;
    top: 7.5px;
    right: 1px;
    transform: rotate(-45deg);
  }
}
</style>