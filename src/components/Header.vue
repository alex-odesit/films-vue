<template>
  <div class="header-wrapper">
    <div class="input-wrapper">
      <div class="img-wrapper">
        <img class="img" :src="imagePreview" v-show="showPreview" />
        <input
          class="input"
          type="file"
          id="file"
          ref="file"
          accept="image/*"
          @change="handleFileUpload"
        />
      </div>
    </div>
    <div class="administrator-wrapper">
      <font-awesome-icon icon="fa-solid fa-user" class="font-awesome" />
      <span class="administrator"> Администратор </span>
      <font-awesome-icon icon="fa-solid fa-power-off" class="font-awesome" />
    </div>
  </div>
</template>



<script>
import DB from "./../../firebase/index";

export default {
  name: "Header",
  data: () => ({
    file: {},
    showPreview: false,
    imagePreview: "",
  }),
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        async () => {
          this.showPreview = true;
          this.imagePreview = reader.result;
          try {
            const url = await DB.sendImg("logo", this.file);
            await DB.sendData("img/logo", { url });
          } catch (error) {
            console.log(error);
          }
        },
        false
      );
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
    async getImg() {
      try {
        this.imagePreview = (await DB.getData("img/logo"))?.url;
        this.showPreview = this.imagePreview ? true : false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async beforeMount() {
    await this.getImg();
  },
};
</script>



<style scoped>
.header-wrapper {
  padding: 15px;
  border-bottom: 3px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input-wrapper {
}
.input {
  font-size: 0;
  width: 150px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
}
.img-wrapper {
  width: 150px;
  height: 60px;
  border: 2px solid #000;
  background: #e6e6e6 url("../assets/add-img.jpg") no-repeat 50% 50%/ 30% auto;
  position: relative;
}
.img-wrapper::before {
  content: "Logo";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -8px;
  margin-left: -19px;
}
.img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.administrator-wrapper {
  display: flex;
  align-items: center;
}
.font-awesome {
  font-size: 25px;
}
.administrator {
  margin: 0px 30px 0px 20px;
}
</style>