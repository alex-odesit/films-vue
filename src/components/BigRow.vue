<template>
  <div class="main-row">
    <div class="input-wrapper" v-for="(item, num) in lists" :key="num">
      <div class="input-box">
        <div class="img-wrapper">
          <img class="img" :src="item.imagePreview" v-show="item.showPreview" />
          <div class="delete" @click="deleteInList(num)"></div>
          <input
            class="input"
            type="file"
            id="file"
            accept="image/*"
            @change="handleFileUpload($event, item)"
            ref="input"
          />
        </div>
        <div v-if="isUrl" class="input-wrapper-item">
          <span> URL: </span>
          <input
            class="input-item"
            type="text"
            placeholder="URl"
            v-model="item.url"
          />
        </div>
        <div v-if="isText" class="input-wrapper-item">
          <span> Текст: </span>
          <input
            class="input-item"
            type="text"
            placeholder="текст"
            v-model="item.text"
          />
        </div>
      </div>
    </div>
    <button @click="addItem" class="add-item">Добавить фото</button>
  </div>
</template>


<script>

import DB from '../../firebase/index'

export default {
  props: {
    lists: Array,
    isText: Boolean,
    isUrl: Boolean,
    download: Boolean,
    databaseLink: String,
    index:String
  },
  methods: {
    handleFileUpload(event, item) {
      item.file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          item.showPreview = true;
          item.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (item.file) {
        if (/\.(jpe?g|png|gif)$/i.test(item.file.name)) {
          reader.readAsDataURL(item.file);
        }
      }
    },
    data:() =>({
      onClick:false
    }),
    deleteInList(id) {
      this.lists.splice(id, 1);
    },
    addItem() {
      const newObj = {
        id: String(Math.random()),
        file: "",
        showPreview: false,
        imagePreview: "",
        URL: "",
        text: "",
      };
      this.lists.push(newObj);
      this.onClick = true;
    },
    test2(){
      this.$refs.input[this.$refs.input.length-1].click();
    },
    test(){
      if(this.onClick === true){
        setTimeout(this.test2,0);
        this.onClick = false;
      }
    },
    async getContent() {
      if(this.download && this.index !== 'new'){
        const test  = await DB.getData(this.databaseLink);
        if(test !== null){
          this.$emit('changeList',test)
        }
      }
    },
  },
  watch:{
    lists: 'test'
  },
  mounted(){
    this.getContent();
  }
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
input:focus{
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>