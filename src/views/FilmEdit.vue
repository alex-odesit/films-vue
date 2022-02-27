<template>
  <div class="wrapper-film-edit">
    <lang :language="language" @changeLang="changeLang" />
    <div v-if="language === 'Russian'">
      <div class="wrapper-input">
        <span> {{ $t('nameFilm') }} </span>
        <input
          type="text"
          placeholder="Название фильма"
          v-model="film.ru.nameFilm"
        />
      </div>
      <div class="wrapper-input">
        <span> {{ $t('descriptionFilm') }} </span>
        <textarea v-model="film.ru.description" placeholder="Текст"></textarea>
      </div>
      <div class="wrapper-input">
        <span> {{ $t('mainPicture') }} </span>
        <oneImage
          @changeimagePreview="changeimagePreviewRu"
          @changeShowPreview="changeShowPreviewTrueRu"
          @changeFile="changeFileRu"
          :imagePreview="film.ru.imagePreview"
          :showPreview="film.ru.showPreview"
          :file="film.ru.file"
          :databaselink="`films/${type}s/${index}/ru/imagePreview`"
          :save="false"
          :download="true"
        />
      </div>
      <span class="subtitle"> {{ $t('galleryPictures') }} </span>
      <div class="wrapper-input wrapper-input-row">
        <span> {{ $t('sizePicture') }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="true"
          :lists="film.ru.list"
          :databaseLink="`films/${type}s/${index}/ru/list`"
          :index="String(index)"
          @changeList="changeListRu"
        />
      </div>

      <div class="wrapper-input wrapper-input-treyler">
        <span> {{ $t('linkTreyler') }} </span>
        <input
          type="text"
          placeholder="Ссылка на видео в youtube"
          v-model="film.ru.linkTreyler"
        />
      </div>
      <div class="input-wrapper input-wrapper_checkBox">
        <span> {{ $t('typeFilm') }} </span>
        <div class="checkBox-wrapper">
          <div class="input-item">
            <span> 3D </span>
            <input type="checkbox" v-model="film.ru.threeD" />
          </div>
          <div class="input-item">
            <span> 2D </span>
            <input type="checkbox" v-model="film.ru.twooD" />
          </div>
          <div class="input-item">
            <span> IMAX </span>
            <input type="checkbox" v-model="film.ru.imax" />
          </div>
        </div>
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="film.ru.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="film.ru.title" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="film.ru.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="film.ru.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </div>




    <div v-if="language === 'Ukraine'">
      <div class="wrapper-input">
        <span> {{ $t('nameFilm') }} </span>
        <input
          type="text"
          placeholder="Название фильма"
          v-model="film.uk.nameFilm"
        />
      </div>
      <div class="wrapper-input">
        <span> {{ $t('descriptionFilm') }}</span>
        <textarea v-model="film.uk.description" placeholder="Текст"></textarea>
      </div>
      <div class="wrapper-input">
        <span> {{ $t('mainPicture') }}</span>
        <oneImage
          @changeimagePreview="changeimagePreviewUk"
          @changeShowPreview="changeShowPreviewTrueUk"
          @changeFile="changeFileUk"
          :imagePreview="film.uk.imagePreview"
          :showPreview="film.uk.showPreview"
          :file="film.uk.file"
          :databaselink="`films/${type}s/${index}/uk/imagePreview`"
          :save="false"
          :download="true"
        />
      </div>
      <span class="subtitle"> {{ $t('galleryPictures') }} </span>
      <div class="wrapper-input wrapper-input-row">
        <span> {{ $t('sizePicture') }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="true"
          :lists="film.uk.list"
          :databaseLink="`films/${type}s/${index}/uk/list`"
          :index="String(index)"
          @changeList="changeListUk"
        />
      </div>

      <div class="wrapper-input wrapper-input-treyler">
        <span> {{ $t('linkTreyler') }}</span>
        <input
          type="text"
          placeholder="Ссылка на видео в youtube"
          v-model="film.uk.linkTreyler"
        />
      </div>
      <div class="input-wrapper input-wrapper_checkBox">
        <span> {{ $t('typeFilm') }} </span>
        <div class="checkBox-wrapper">
          <div class="input-item">
            <span> 3D </span>
            <input type="checkbox" v-model="film.uk.threeD" />
          </div>
          <div class="input-item">
            <span> 2D </span>
            <input type="checkbox" v-model="film.uk.twooD" />
          </div>
          <div class="input-item">
            <span> IMAX </span>
            <input type="checkbox" v-model="film.uk.imax" />
          </div>
        </div>
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="film.uk.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="film.uk.title" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="film.uk.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="film.uk.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons-wrapper">
        <button @click="saveData">
          {{ $t('save') }}  <load v-if="isSave" class="load" />
        </button>
        <template v-if="howButton">
          <button @click="resaveDataClick">{{ $t('baseVersion') }}</button>
        </template>
        <template v-else>
          <button @click="resaveDataClick">{{ $t('noNewFilm') }}</button>
        </template>
      </div>
      <popap
        @deleteData="resaveData"
        @noDeleteData="resaveDataClick"
        class="popap"
        :class="isActivePopap"
        :array="[
          'Вы действительно хотите отменить изменения?',
          'Нет',
          'Отменить изменения',
        ]"
      />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import popap from "@/components/films/filmPopap";
import lang from "../components/Lang.vue";

import DB from "../../firebase/index";

import load from "../components/Load.vue";

export default {
  components: {
    oneImage,
    BigRow,
    popap,
    load,
    lang,
  },
  data: () => ({
    film: {
      ru:{
        id: 1,
        nameFilm: "новый фильм",
        description: "",
        file: {},
        showPreview: false,
        imagePreview: "",
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
        linkTreyler: "",
        threeD: false,
        twooD: false,
        imax: false,
        url: "",
        title: "",
        keywords: "",
        seoDescription: "",
        urlMain: ""
      },
      uk:{
        id: 1,
        nameFilm: "новий фільм",
        description: "",
        file: {},
        showPreview: false,
        imagePreview: "",
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
        linkTreyler: "",
        threeD: false,
        twooD: false,
        imax: false,
        url: "",
        title: "",
        keywords: "",
        seoDescription: "",
        urlMain: ""
      }
    },
      
    isPopap: false,
    isSave: false,
    downloadFilm: false,
    language: "Russian",
  }),
  computed: {
    index() {
      return this.$route.params["id"];
    },
    type() {
      return this.$route.params["type"];
    },
    howButton() {
      return this.index !== "new";
    },
    ...mapGetters(["getCurrentFilms", "getFutureFilms"]),
    isActivePopap() {
      return {
        "acive-popap": this.isPopap,
      };
    },
  },
  watch: {
    getCurrentFilms: function () {
      if (this.index !== "new" && this.$route.path.slice(0, 9) == "/films/cu") {
        this.film = this.getCurrentFilms[this.index];
      }
    },
    getFutureFilms: function(){
      if (this.index !== "new" && this.downloadFilm) {
        this.film = this.getFutureFilms[this.index];
        this.downloadFilm = false;
      }
    }
  },
  methods: {
    ...mapActions(["downloadFilms", "saveFilm", "newFilm"]),
    getData() {
      if (this.index !== "new") {
        if (this.$route.path.slice(0, 9) == "/films/cu") {
          this.downloadFilms("films/currentFilms");
        } else {
          this.downloadFilm = true;
          this.downloadFilms("films/futureFilms");
        }
      }
    },
    changeFileRu(file) {
      this.film.ru.file = file;
    },
    changeShowPreviewTrueRu(bool) {
      this.film.ru.showPreview = bool;
    },
    changeimagePreviewRu(imagePreview) {
      this.film.ru.imagePreview = imagePreview;
    },
    changeListRu(list) {
      this.film.ru.list = list;
    },
    changeFileUk(file) {
      this.film.uk.file = file;
    },
    changeShowPreviewTrueUk(bool) {
      this.film.uk.showPreview = bool;
    },
    changeimagePreviewUk(imagePreview) {
      this.film.uk.imagePreview = imagePreview;
    },
    changeListUk(list) {
      this.film.uk.list = list;
    },
    saveData() {
      this.isSave = true;
      if (this.index !== "new") {
        this.saveFilm([this.index, this.film, this.type]);
      } else {
        this.newFilm([this.film, this.type]);
      }
    },
    async resaveData() {
      try {
        let databaseFilm = await DB.getData(
          `films/${this.type}s/${this.index}`
        );
        if (databaseFilm) {
          this.film = databaseFilm;
        } else {
          this.$router.push("/films");
        }
        this.isPopap = false;
      } catch (err) {
        console.log(err);
      }
    },
    resaveDataClick() {
      this.isPopap = !this.isPopap ? true : false;
    },
    changeLang(lang) {
      this.language = lang;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="scss">
.wrapper-film-edit {
  padding: 50px;
}
.wrapper-input {
  display: flex;
  margin-bottom: 20px;
  span {
    margin-right: 20px;
  }
  input {
    width: 300px;
  }
}
textarea {
  resize: none;
  width: 100%;
  height: 70px;
}
.wrapper-input-row {
  margin-top: 30px;
}
.wrapper-input-treyler {
  span {
    display: block;
    flex: 0 0 15%;
  }
  input {
    flex: 0 0 85%;
  }
}
.input-wrapper_checkBox {
  display: flex;
  span {
    margin-right: 50px;
  }
  margin-bottom: 40px;
}
.checkBox-wrapper {
  display: flex;
  span {
    margin-right: 3px;
  }
}
.input-item {
  margin-right: 40px;
}
.seo-input-wrapper {
  width: 100%;
}
.seo-wrapper-title {
  flex: 0 0 100px;
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
      flex: 0 1 100%;
    }
    textarea {
      flex: 0 1 100%;
    }
  }
}
.buttons-wrapper {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  button {
    border-radius: 7px;
    &:first-child {
      margin-right: 40px;
    }
  }
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
button {
  position: relative;
}
.load {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
