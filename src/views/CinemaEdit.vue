<template>
  <div class="wrapper-content">
    <lang :language="language" @changeLang="changeLang" />
    <div v-if="language === 'Russian'">
      <div class="input-wrapper">
        <span> {{ $t("nameCinema") }} </span>
        <input
          type="text"
          placeholder="Название кинотетра"
          v-model="cinema.ru.nameCinema"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("descriptionFilm") }} </span>
        <textarea placeholder="Текст" v-model="cinema.ru.description"></textarea>
      </div>
      <div class="input-wrapper">
        <span> {{ $t("ifCInema") }} </span>
        <textarea placeholder="Текст" v-model="cinema.ru.if"></textarea>
      </div>
      <div class="input-wrapper">
        <span>Логотип </span>
        <oneImage
          @changeimagePreview="changeimagePreviewLogoRU"
          @changeShowPreview="changeShowPreviewTrueLogoRU"
          @changeFile="changeFileLogoRU"
          :imagePreview="cinema.ru.imagePreviewLogo"
          :showPreview="cinema.ru.showPreviewLogo"
          :file="cinema.ru.fileLogo"
          :databaselink="`cinema/${index}/ru/imagePreviewLogo`"
          :save="false"
          :download="false"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("abovePhoto") }} </span>
        <oneImage
          @changeimagePreview="changeimagePreviewBackRU"
          @changeShowPreview="changeShowPreviewTrueBackRU"
          @changeFile="changeFileBackRU"
          :imagePreview="cinema.ru.imagePreviewBack"
          :showPreview="cinema.ru.showPreviewBack"
          :file="cinema.ru.fileBack"
          :databaselink="`cinema/${index}/ru/imagePreviewBack`"
          :save="false"
          :download="false"
        />
      </div>
      <span class="title"> {{ $t("galleryPictures") }} </span>
      <div class="input-wrapper">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="cinema.ru.list"
          :databaseLink="`cinema/${index}/ru/list`"
          :index="String(index)"
          @changeList="changeListRU"
        />
      </div>
    </div>

    <div v-if="language === 'Ukraine'">
      <div class="input-wrapper">
        <span> {{ $t("nameCinema") }} </span>
        <input
          type="text"
          placeholder="Название кинотетра"
          v-model="cinema.uk.nameCinema"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("descriptionFilm") }} </span>
        <textarea placeholder="Текст" v-model="cinema.uk.description"></textarea>
      </div>
      <div class="input-wrapper">
        <span> {{ $t("ifCInema") }}</span>
        <textarea placeholder="Текст" v-model="cinema.uk.if"></textarea>
      </div>
      <div class="input-wrapper">
        <span> Логотип </span>
        <oneImage
          @changeimagePreview="changeimagePreviewLogoUK"
          @changeShowPreview="changeShowPreviewTrueLogoUK"
          @changeFile="changeFileLogoUK"
          :imagePreview="cinema.uk.imagePreviewLogo"
          :showPreview="cinema.uk.showPreviewLogo"
          :file="cinema.uk.fileLogo"
          :databaselink="`cinema/${index}/uk/imagePreviewLogo`"
          :save="false"
          :download="false"
        />
      </div>
      <div class="input-wrapper">
        <span> {{ $t("abovePhoto") }} </span>
        <oneImage
          @changeimagePreview="changeimagePreviewBackUK"
          @changeShowPreview="changeShowPreviewTrueBackUK"
          @changeFile="changeFileBackUK"
          :imagePreview="cinema.uk.imagePreviewBack"
          :showPreview="cinema.uk.showPreviewBack"
          :file="cinema.uk.fileBack"
          :databaselink="`cinema/${index}/uk/imagePreviewBack`"
          :save="false"
          :download="false"
        />
      </div>
      <span class="title"> {{ $t("galleryPictures") }} </span>
      <div class="input-wrapper">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="cinema.uk.list"
          :databaseLink="`cinema/${index}/uk/list`"
          :index="String(index)"
          @changeList="changeListUK"
        />
      </div>
    </div>

    <rowHalls
      :halls="cinema.halls"
      :cinema="cinema"
      :index="index"
      @removeHall="removeHall"
    />

    <div v-if="language === 'Russian'">
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="cinema.ru.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="cinema.ru.title" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="cinema.ru.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="cinema.ru.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div v-if="language === 'Ukraine'">
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="cinema.uk.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="cinema.uk.title" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="cinema.uk.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="cinema.uk.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-save">
      <button @click="saveCinemaItem">
        {{ $t("save") }} <load v-if="isSave" class="load" />
      </button>
      <button v-if="isNoSave" @click="goBack">Не добавлять фильм</button>
    </div>
    <popap
      @deleteData="resaveData"
      @noDeleteData="resaveDataClick"
      class="popap"
      :array="['Вы действительно хотите удалить зал?', 'Нет', 'Удалить']"
      :class="isActivePopap"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import load from "../components/Load.vue";
import rowHalls from "../components/cinemas/HallRow";
import popap from "../components/films/filmPopap";
import lang from "../components/Lang.vue";

export default {
  components: {
    oneImage,
    BigRow,
    load,
    rowHalls,
    popap,
    lang,
  },
  data: () => ({
    cinema:{
      ru:{
        nameCinema: "Новый кинотеатр",
        fileLogo: {},
        showPreviewLogo: false,
        imagePreviewLogo: "",
        description: "",
        if: "",
        fileBack: {},
        showPreviewBack: false,
        imagePreviewBack: "",
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
        seoDescription: "",
      },
      uk:{
        nameCinema: "Новий кинотеатр",
        fileLogo: {},
        showPreviewLogo: false,
        imagePreviewLogo: "",
        description: "",
        if: "",
        fileBack: {},
        showPreviewBack: false,
        imagePreviewBack: "",
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
        seoDescription: "",
      },
      halls: [
        {
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
            seoDescription: "",
            date: "000000",
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
            seoDescription: "",
            date: "000000",
          },
        },
      ],
    },
    isSave: false,
    isWatch: false,
    removeIndex: null,
    isPopap: false,
    isNoSave: false,
    language: "Russian",
  }),
  methods: {
    ...mapActions(["downloadCinemas", "saveCinema", "addCinema"]),
    getData() {
      if (this.index !== "new" && this.edit !== "edit") {
        this.isWatch = true;
        this.downloadCinemas("cinema");
      } else if (this.edit === "edit" && this.getTimeCinema.halls) {
        this.cinema = this.getTimeCinema;
      } else if (this.index !== "new") {
        this.isWatch = true;
        this.downloadCinemas("cinema");
      } else {
        this.isNoSave = true;
        let date = new Date();
        let day =
          date.getDate() < 10 ? "0" + `${date.getDate()}` : date.getDate();
        let month =
          date.getMonth() + 1 < 10
            ? "0" + `${date.getMonth() + 1}`
            : date.getMonth() + 1;
        this.cinema.halls[0].date = `${day}.${month}.${date.getFullYear()}`;
      }
    },
    changeFileLogoRU(file) {
      this.cinema.ru.fileLogo = file;
    },
    changeShowPreviewTrueLogoRU(bool) {
      this.cinema.ru.showPreviewLogo = bool;
    },
    changeimagePreviewLogoRU(imagePreview) {
      this.cinema.ru.imagePreviewLogo = imagePreview;
    },
    changeFileLogoUK(file) {
      this.cinema.uk.fileLogo = file;
    },
    changeShowPreviewTrueLogoUK(bool) {
      this.cinema.uk.showPreviewLogo = bool;
    },
    changeimagePreviewLogoUK(imagePreview) {
      this.cinema.uk.imagePreviewLogo = imagePreview;
    },
    changeLang(lang) {
      this.language = lang;
    },
    changeFileBackRU(file) {
      this.cinema.ru.fileBack = file;
    },
    changeShowPreviewTrueBackRU(bool) {
      this.cinema.ru.showPreviewBack = bool;
    },
    changeimagePreviewBackRU(imagePreview) {
      this.cinema.ru.imagePreviewBack = imagePreview;
    },
    changeListRU(list) {
      this.cinema.ru.list = list;
    },
    changeFileBackUK(file) {
      this.cinema.uk.fileBack = file;
    },
    changeShowPreviewTrueBackUK(bool) {
      this.cinema.uk.showPreviewBack = bool;
    },
    changeimagePreviewBackUK(imagePreview) {
      this.cinema.uk.imagePreviewBack = imagePreview;
    },
    changeListUK(list) {
      this.cinema.uk.list = list;
    },
    saveCinemaItem() {
      this.isSave = true;
      if (this.index == "new") {
        this.addCinema(this.cinema);
      } else {
        this.saveCinema([this.index, this.cinema]);
      }
    },
    removeHall(index) {
      this.removeIndex = index;
      this.isPopap = true;
    },
    resaveData() {
      this.cinema.halls.splice(this.removeIndex, 1);
      this.isPopap = false;
    },
    resaveDataClick() {
      this.isPopap = false;
    },
    goBack() {
      this.$router.push("/cinemas");
    },
  },
  watch: {
    getCinemas: function () {
      if (this.isWatch) {
        this.cinema = this.getCinemas[this.index];
        this.isWatch = false;
      }
    },
  },
  computed: {
    ...mapGetters(["getCinemas", "getTimeCinema"]),
    index() {
      return this.$route.params.id;
    },
    edit() {
      return this.$route.params.edit;
    },
    isActivePopap() {
      return {
        "acive-popap": this.isPopap,
      };
    },
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
    &:last-child {
      margin-left: 10px;
    }
  }
}
.load {
  position: absolute;
  top: 0;
  right: 0;
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
