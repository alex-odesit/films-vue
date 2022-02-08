<template>
  <div>
    
    <h1>Сквозной банер на заднем фоне</h1>
    <div class="main-wrapper">
      <p class="size">Размер: 2000х3000</p>
      <div class="main-row">
        <div class="radio">
          <input
            type="radio"
            id="one"
            value="backPhoto"
            @change="backChange"
            v-model="picked"
          />
          <label class="first-label" for="one">Фото на фон</label>
          <input
            type="radio"
            id="two"
            value="backColor"
            @change="backChange"
            v-model="picked"
          />
          <label for="two">Просто фон</label>
        </div>
        <oneImage
        v-if="picked === 'backPhoto'"
        @changeimagePreview='changeimagePreview' 
        @changeShowPreview='changeShowPreview' 
        @changeFile='changeFile' 
        :imagePreview='imagePreview' 
        :showPreview='showPreview' 
        :file='file'
        :storageLink='storageLink'
        :databaselink='databaselink'
        :save='true' />
      </div>
    </div>
  </div>
</template>




<script>

import DB from "../../../firebase/index";
import oneImage from '../addImageOne.vue'
export default {
  name: "Back",
  components:{
    oneImage
  },
  data: () => ({
    picked: "backPhoto",
    file: {},
    showPreview: false,
    imagePreview: "",
    storageLink:'images/banners/back',
    databaselink:'banners/backURL'
  }),
  methods: {
    changeFile(file){
      this.file = file;
    },
    changeShowPreview(bool){
      this.showPreview = bool;
    },
    changeimagePreview(imagePreview){
      this.imagePreview = imagePreview;
    },
    async backChange() {
      await DB.sendData("banners/backType", { type: this.picked });
    },
    async getContent() {
      // this.picked = await DB.getData("banners/backType").then(
      //   (result) => result.type
      // );
      // this.download = true;
      this.picked = (await DB.getData("banners/backType"))?(await DB.getData("banners/backType").then(
        (result) => result.type
      )):this.picked;
      this.download = true;
    },
  },
  async beforeMount() {
    await this.getContent();
  },
};
</script>





<style scoped>
h1 {
  font-weight: 700;
  font-size: 30px;
  text-align: center;
}
.main-wrapper {
  border: 1px solid #000;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 100px;
}
.main-row {
  padding: 10px 0px 20px 25px;
  display: flex;
}
.main-row label {
  font-size: 18px;
}
.first-label {
  margin-bottom: 30px;
  display: block;
}
.radio {
  margin-right: 100px;
}
.input {
  font-size: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
}
.img-wrapper {
  width: 170px;
  height: 100px;
  border: 2px solid #000;
  background: #e6e6e6 url("../../assets/add-img.jpg") no-repeat 50% 50%/ 30% auto;
  position: relative;
}
.img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.add-photo {
  position: relative;
  margin-right: 50px;
  margin-left: 50px;
}
button {
  border: 1px solid #000;
  border-radius: 5px;
  width: 150px;
  height: 40px;
}
.input-wrapper {
  display: flex;
}
</style>