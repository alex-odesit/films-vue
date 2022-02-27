<template>
  <div class="photo">
    <div class="input-wrapper">
      <div class="img-wrapper">
        <img class="img" :src="imagePreview" v-show="showPreview" />
      </div>
      <div class="buttons">
        <button class="add-photo">
          {{ $t('add') }}
          <input
            class="input"
            type="file"
            id="file"
            ref="file"
            accept="image/*"
            @change="saved"
          />
          <load v-if="isAddLoad" class="load" />
        </button>
        <button @click="removePhoto">
          {{ $t('remove') }} <load v-if="isDeleteLoad" class="load" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DB from "../../firebase/index";
import load from "../components/Load.vue";

export default {
  name: "ImgOne",
  components: {
    load,
  },
  data: () => ({
    isAddLoad: false,
    isDeleteLoad: false,
  }),
  props: [
    "imagePreview",
    "showPreview",
    "file",
    "download",
    "storageLink",
    "databaselink",
    "save",
  ],
  methods: {
    handleFileUpload() {
      this.isAddLoad = true;
      let file = this.$refs.file.files[0];
      this.$emit("changeFile", file);
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        async () => {
          this.$emit("changeShowPreview", true);
          let imagePreview = reader.result;
          this.$emit("changeimagePreview", imagePreview);
          try {
            const url = await DB.sendImg(this.storageLink, file);
            await DB.sendData(this.databaselink, { url }).then(() => {
              this.isAddLoad = false;
            });
          } catch (error) {
            console.log(error);
          }
        },
        false
      );
      if (file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          reader.readAsDataURL(file);
        }
      }
    },
    handleFileUploadNO() {
      let file = this.$refs.file.files[0];
      this.$emit("changeFile", file);
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.$emit("changeShowPreview", true);
          let imagePreview = reader.result;
          this.$emit("changeimagePreview", imagePreview);
        },
        false
      );
      if (file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          reader.readAsDataURL(file);
        }
      }
    },
    async removePhoto() {
      this.$emit("changeFile", "");
      this.$emit("changeShowPreview", false);
      this.$emit("changeimagePreview", "");
      if (this.save) {
        this.isDeleteLoad = true;
        await DB.deleteStorageItem(this.storageLink);
        await DB.removeData(this.databaselink).then(() => {
          this.isDeleteLoad = false;
        });
      }
    },
    async getContent() {
      if (this.download) {
        let imagePreview;

        if (this.save) {
          imagePreview = (await DB.getData(this.databaselink))?.url;
        } else imagePreview = await DB.getData(this.databaselink);

        this.$emit("changeimagePreview", imagePreview);
        let showPreview = !imagePreview ? false : true;
        this.$emit("changeShowPreview", showPreview);
      }
    },
  },
  mounted() {
    this.getContent();
  },
  computed: {
    saved() {
      if (this.save) {
        return this.handleFileUpload;
      } else return this.handleFileUploadNO;
    },
  },
};
</script>

<style scoped>
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
  position: relative;
}
.input-wrapper {
  display: flex;
}
.load {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
