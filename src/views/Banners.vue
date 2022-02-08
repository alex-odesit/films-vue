<template>
  <div>
    <h1>На главной верх</h1>
    <div class="main-wrapper">
      <p class="size">Размер: 1000х190</p>
      <BigRow :isText="true" :lists="list" :isUrl='true' />

      <div class="second-row">
        <div class="speed">
          <p>Скорость вращения</p>
          <select v-model="selectFirst">
            <option value="1">1c</option>
            <option value="3">3c</option>
            <option value="5">5c</option>
            <option value="7">7c</option>
          </select>
        </div>
        <button @click="sendDataFirst">Сохранить</button>
      </div>
    </div>

    <Back />

    <div>
      <h1>На главной Новости Акции</h1>
      <div class="main-wrapper">
        <p class="size">Размер: 1000х190</p>
        <BigRow :isText="false" :lists="listNews" :isUrl='true' />
        <div class="second-row">
          <div class="speed">
            <p>Скорость вращения</p>
            <select v-model="selectSecond">
              <option value="1">1c</option>
              <option value="3">3c</option>
              <option value="5">5c</option>
              <option value="7">7c</option>
            </select>
          </div>
          <button @click="sendDataSecond">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import BigRow from "@/components/BigRow";
import Back from "@/components/baner/Back";

import DB from "./../../firebase/index";


export default {
  components: {
    BigRow,
    Back,
  },
  data: () => ({
    list: [
      {
        id: 1,
        file: "",
        showPreview: false,
        imagePreview: "",
        text: "",
        url: "",
      },
    ],
    listNews: [
      {
        id: 1,
        file: "",
        showPreview: false,
        imagePreview: "",
        url: "",
      },
      {
        id: 2,
        file: "",
        showPreview: false,
        imagePreview: "",
        url: "",
      },
      {
        id: 3,
        file: "",
        showPreview: false,
        imagePreview: "",
        url: "",
      },
    ],
    selectFirst: "5",
    selectSecond: "5"
  }),
  methods: {
    async sendData(array,url,link,speedLink, speed) {
      // const test = await DB.getImgStorage('images/banners/first/0');
      // console.log(test);
      // console.log(this.list[0].file);
      await (await DB.deleteStorage(`${url}`));
      const newList = [];
      for (const index in array) {
        array[index].url = await DB.sendImg(`${url}/${index}`, array[index].file);
        newList.push(array[index]);
      }
      await DB.sendData(link, array);

      await DB.sendData(speedLink, {speed: speed});
      return newList;
    },


    async sendDataFirst(){
       this.list = await this.sendData(this.list,'images/banners/first','banners/first','banners/firstSpeed',this.selectFirst)
    },
    async sendDataSecond(){
       this.listNews = await this.sendData(this.listNews,'images/banners/second','banners/second','banners/secondSpeed',this.selectSecond)
    },
    async getContent() {
      try {
        this.list = (await DB.getArray('banners/first'))?(await DB.getArray('banners/first')):this.list;
        this.listNews = (await DB.getArray('banners/second'))?(await DB.getArray('banners/second')):this.listNews;
        this.selectFirst = (await DB.getData('banners/firstSpeed'))? await DB.getData('banners/firstSpeed').then(
          (result) => result.speed
        ):this.selectFirst;
        this.selectSecond = (await DB.getData('banners/secondSpeed'))? await DB.getData('banners/secondSpeed').then(
          (result) => result.speed
        ):this.selectSecond;
      } catch (error) {
        console.error(error);
      }
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
.btn {
  position: relative;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #000;
  width: 150px;
  margin-top: 15px;
}
.input-wrapper {
  display: flex;
  justify-content: start;
  margin-bottom: 50px;
}
.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
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
  width: 150px;
  height: 90px;
  border: 2px solid #000;
  background: #e6e6e6 url("../assets/add-img.jpg") no-repeat 50% 50%/ 30% auto;
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
.input-wrapper-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}
.input-wrapper-item span {
  flex: 0 0 40px;
}
.input-item {
}
.main-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.main-wrapper {
  border: 1px solid #000;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 100px;
}
.delete {
  width: 25px;
  height: 25px;
  position: absolute;
  right: -20px;
  top: -20px;
  border: 3px solid #000;
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;
}
.delete::after {
  content: "";
  width: 16px;
  height: 3px;
  background-color: #000;
  position: absolute;
  top: 7px;
  right: 1px;
  transform: rotate(45deg);
}
.delete::before {
  content: "";
  width: 16px;
  height: 3px;
  background-color: #000;
  position: absolute;
  top: 7.5px;
  right: 1px;
  transform: rotate(-45deg);
}
.add-item {
  height: 50px;
}
.second-row {
  width: 50%;
  display: flex;
  font-size: 17px;
  justify-content: space-between;
}
.speed {
  display: flex;
  align-items: center;
}
.speed p {
  margin: 0px 50px 0px 50px;
}
</style>