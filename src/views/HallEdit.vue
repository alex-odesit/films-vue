<template>
  <div class="wrapper-content">
    <lang :language="language" @changeLang="changeLang" />
    <div v-if="language === 'Russian'">
      <div class="input-wrapper">
        <span> Номер зала </span>
        <input type="text" placeholder="Название кинотетра" v-model="hall.ru.name" />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("descriptionFilm") }} </span>
        <textarea placeholder="Текст" v-model="hall.ru.description"></textarea>
      </div>
      <div class="input-wrapper">
        <span> Схема зала </span>
        <oneImage
          @changeimagePreview="changeimagePreviewChemRU"
          @changeShowPreview="changeShowPreviewTrueChemRU"
          @changeFile="changeFileChemRU"
          :imagePreview="hall.ru.imagePreviewChem"
          :showPreview="hall.ru.showPreviewChem"
          :file="hall.ru.fileChem"
          :databaselink="`cinema/${id}/halls/${index}/ru/imagePreviewChem`"
          :save="false"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("abovePhoto") }} </span>
        <oneImage
          @changeimagePreview="changeimagePreviewBanerRU"
          @changeShowPreview="changeShowPreviewTrueBanerRU"
          @changeFile="changeFileBanerRU"
          :imagePreview="hall.ru.imagePreviewBaner"
          :showPreview="hall.ru.showPreviewBaner"
          :file="hall.ru.fileBaner"
          :databaselink="`cinema/${id}/halls/${index}/ru/imagePreviewBaner`"
          :save="false"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("sizePicture") }}  1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="hall.ru.list"
          :databaseLink="`cinema/${id}/halls/${index}/ru/list`"
          :index="String(index)"
          @changeList="changeListRU"
        />
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="hall.ru.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="hall.ru.title" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="hall.ru.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="hall.ru.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </div>




    <div v-if="language === 'Ukraine'">
      <div class="input-wrapper">
        <span> Номер зала </span>
        <input type="text" placeholder="Название кинотетра" v-model="hall.uk.name" />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("descriptionFilm") }} </span>
        <textarea placeholder="Текст" v-model="hall.uk.description"></textarea>
      </div>
      <div class="input-wrapper">
        <span> Схема зала </span>
        <oneImage
          @changeimagePreview="changeimagePreviewChemUK"
          @changeShowPreview="changeShowPreviewTrueChemUK"
          @changeFile="changeFileChemUK"
          :imagePreview="hall.uk.imagePreviewChem"
          :showPreview="hall.uk.showPreviewChem"
          :file="hall.uk.fileChem"
          :databaselink="`cinema/${id}/halls/${index}/uk/imagePreviewChem`"
          :save="false"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("abovePhoto") }} </span>
        <oneImage
          @changeimagePreview="changeimagePreviewBanerUK"
          @changeShowPreview="changeShowPreviewTrueBanerUK"
          @changeFile="changeFileBanerUK"
          :imagePreview="hall.uk.imagePreviewBaner"
          :showPreview="hall.uk.showPreviewBaner"
          :file="hall.uk.fileBaner"
          :databaselink="`cinema/${id}/halls/${index}/uk/imagePreviewBaner`"
          :save="false"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="hall.uk.list"
          :databaseLink="`cinema/${id}/halls/${index}/uk/list`"
          :index="String(index)"
          @changeList="changeListUK"
        />
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="hall.uk.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="hall.uk.title" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="hall.uk.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="hall.uk.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    
    <div class="btn-save">
      <button @click="save">
        {{ $t("save") }} <load v-if="isSave" class="load" />
      </button>
    </div>
  </div>
</template>

<script>
import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import load from "../components/Load.vue";
import lang from "../components/Lang.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    oneImage,
    BigRow,
    load,
    lang
  },
  data: () => ({
    hall: {
      date:'',
      ru:{
        name: "Новый зал",
        description: "",
        imagePreviewChem: "",
        fileChem: "",
        showPreviewChem: false,
        imagePreviewBaner: "",
        showPreviewBaner: false,
        fileBaner: "",
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
        url: "",
        title: "",
        keywords: "",
        seoDescription: ""
      },
      uk:{
        name: "Новый зал",
        description: "",
        imagePreviewChem: "",
        fileChem: "",
        showPreviewChem: false,
        imagePreviewBaner: "",
        showPreviewBaner: false,
        fileBaner: "",
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
        url: "",
        title: "",
        keywords: "",
        seoDescription: ""
      },
    },
    
    isSave: false,
    isWatch: false,
    language: "Russian",
  }),
  watch: {
    getTimeCinema: function () {
      console.log(this.getTimeCinema);
      this.hall = this.getTimeCinema.halls[this.index];
      this.isWatch = false;
    },
  },
  methods: {
    ...mapActions(["downloadHall", "addHall", "saveHall"]),
    getData() {
      if (this.index !== "new") {
        let date = new Date();
        let day =
          date.getDate() < 10 ? "0" + `${date.getDate()}` : date.getDate();
        let month =
          date.getMonth() + 1 < 10
            ? "0" + `${date.getMonth() + 1}`
            : date.getMonth() + 1;
        this.hall.date = `${day}.${month}.${date.getFullYear()}`;
        if (this.getTimeCinema.id == 0 || this.getTimeCinema.id) {
          this.hall = this.getTimeCinema.halls[this.index];
        } else if(this.id !=="new") {
          this.isWatch = true;
          this.downloadHall(`cinema/${this.id}`);
        } 
      }
    },
    changeFileChemRU(file) {
      this.hall.ru.fileChem = file;
    },
    changeShowPreviewTrueChemRU(bool) {
      this.hall.ru.showPreviewChem = bool;
    },
    changeimagePreviewChemRU(imagePreview) {
      this.hall.ru.imagePreviewChem = imagePreview;
    },
    changeFileBanerRU(file) {
      this.hall.ru.fileBaner = file;
    },
    changeShowPreviewTrueBanerRU(bool) {
      this.hall.ru.showPreviewBaner = bool;
    },
    changeimagePreviewBanerRU(imagePreview) {
      this.hall.ru.imagePreviewBaner = imagePreview;
    },
    changeListRU(list) {
      this.hall.ru.list = list;
    },
    changeFileChemUK(file) {
      this.hall.uk.fileChem = file;
    },
    changeShowPreviewTrueChemUK(bool) {
      this.hall.uk.showPreviewChem = bool;
    },
    changeimagePreviewChemUK(imagePreview) {
      this.hall.uk.imagePreviewChem = imagePreview;
    },
    changeFileBanerUK(file) {
      this.hall.uk.fileBaner = file;
    },
    changeShowPreviewTrueBanerUK(bool) {
      this.hall.uk.showPreviewBaner = bool;
    },
    changeimagePreviewBanerUK(imagePreview) {
      this.hall.uk.imagePreviewBaner = imagePreview;
    },
    changeListUK(list) {
      this.hall.uk.list = list;
    },
    changeLang(lang) {
      this.language = lang;
    },
    save() {
      this.isSave = true;
      if (this.index == "new") {
        this.addHall([this.hall, this.id]);
      } else {
        this.saveHall([this.hall, this.id, this.index]);
      }
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    index() {
      return this.$route.params.index;
    },
    ...mapGetters(["getTimeCinema"]),
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="scss">
.wrapper-content {
  padding: 50px;
}
.input-wrapper {
  display: flex;
  span {
    display: block;
    flex: 0 0 150px;
  }
  input {
    width: 300px;
  }
  margin-bottom: 20px;
}
textarea {
  width: 100%;
  height: 80px;
  resize: none;
}

.seo-wrapper {
  display: flex;
  .input-wrapper {
    display: flex;
    span {
      flex: 0 0 100px;
      text-align: right;
      margin-right: 10px;
    }
    input {
      flex: 0 0 100%;
    }
    textarea {
      flex: 0 0 100%;
    }
  }
}
.btn-save {
  display: flex;
  justify-content: center;
  button {
    position: relative;
  }
}
.load {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
