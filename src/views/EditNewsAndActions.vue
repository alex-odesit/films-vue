<template>
  <div>
    <lang :language="language" @changeLang="changeLang" />

    <template v-if="language === 'Russian'">
      <div class="input-check-wrapper" :class="activeStatusRU">
        <span @click="showRU"></span>
        <input type="checkbox" v-model="item.ru.status" />
        <div class="input-check-title">
          {{ item.ru.status ? "вкл" : "выкл" }}
        </div>
      </div>
      <div class="items-wrapper">
        <div class="item-box">
          <span class="item-title">
            {{ $t("nameNews") }}
          </span>
          <input
            type="text"
            class="item-input first-input"
            v-model="item.ru.title"
          />
        </div>
        <div class="item-box">
          <span class="item-title">
            {{ $t("DatePublication") }}
          </span>
          <div class="item-input">
            <DatePicker v-model="item.ru.date">
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="px-3 py-1 border rounded"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </DatePicker>
          </div>
        </div>
      </div>
      <div class="item-box">
        <span class="item-title">
          {{ $t("descriptionFilm") }}
        </span>
        <textarea
          placeholder="Текст"
          class="item-input"
          v-model="item.ru.description"
        ></textarea>
      </div>
      <div class="item-box">
        <span class="item-title"> {{ $t("mainPicture") }} </span>
        <oneImage
          @changeimagePreview="changeImagePreviewRU"
          @changeShowPreview="changeShowPreviewTrueRU"
          @changeFile="changeFileRU"
          :imagePreview="item.ru.imagePreview"
          :showPreview="item.ru.showPreview"
          :file="item.ru.file"
          :databaselink="`${currentPage}/${index}/ru/imagePreview`"
          :save="false"
          :download="false"
        />
      </div>
      <span class="title"> {{ $t("galleryPictures") }} </span>
      <div class="item-box">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="item.ru.list"
          :databaseLink="`${currentPage}/${index}/ru/list`"
          :index="String(index)"
          class="big-row"
          @changeList="changeListRU"
        />
      </div>
      <div class="item-box">
        <span class="item-title">
          {{ $t("linkVideo") }}
        </span>
        <input
          placeholder="Ссылка на видео в youtube"
          type="text"
          class="item-input"
          v-model="item.ru.linkVideo"
        />
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="item.ru.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="item.ru.titleSeo" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="item.ru.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="item.ru.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </template>

    <template v-if="language === 'Ukraine'">
      <div class="input-check-wrapper" :class="activeStatusUK">
        <span @click="showUK"></span>
        <input type="checkbox" v-model="item.uk.status" />
        <div class="input-check-title">
          {{ item.uk.status ? "вкл" : "выкл" }}
        </div>
      </div>
      <div class="items-wrapper">
        <div class="item-box">
          <span class="item-title">
            {{ $t("nameNews") }}
          </span>
          <input
            type="text"
            class="item-input first-input"
            v-model="item.uk.title"
          />
        </div>
        <div class="item-box">
          <span class="item-title">
            {{ $t("DatePublication") }}
          </span>
          <div class="item-input">
            <DatePicker v-model="item.uk.date">
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="px-3 py-1 border rounded"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </DatePicker>
          </div>
        </div>
      </div>
      <div class="item-box">
        <span class="item-title">
          {{ $t("descriptionFilm") }}
        </span>
        <textarea
          placeholder="Текст"
          class="item-input"
          v-model="item.uk.description"
        ></textarea>
      </div>
      <div class="item-box">
        <span class="item-title"> {{ $t("mainPicture") }} </span>
        <oneImage
          @changeimagePreview="changeImagePreviewUK"
          @changeShowPreview="changeShowPreviewTrueUK"
          @changeFile="changeFileUK"
          :imagePreview="item.uk.imagePreview"
          :showPreview="item.uk.showPreview"
          :file="item.uk.file"
          :databaselink="`${currentPage}/${index}/uk/imagePreview`"
          :save="false"
          :download="false"
        />
      </div>
      <span class="title"> {{ $t("galleryPictures") }} </span>
      <div class="item-box">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="item.uk.list"
          :databaseLink="`${currentPage}/${index}/uk/list`"
          :index="String(index)"
          @changeList="changeListUK"
        />
      </div>
      <div class="item-box">
        <span class="item-title">
          {{ $t("linkVideo") }}
        </span>
        <input
          placeholder="Ссылка на видео в youtube"
          type="text"
          class="item-input"
          v-model="item.uk.linkVideo"
        />
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper input-wrapper_URL">
            <span> URL: </span>
            <input v-model="item.uk.url" placeholder="URL" />
          </div>
          <div class="input-wrapper input-wrapper_title">
            <span> Title: </span>
            <input v-model="item.uk.titleSeo" placeholder="Title" />
          </div>
          <div class="input-wrapper input-wrapper_words">
            <span> Keywords: </span>
            <input v-model="item.uk.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper input-wrapper_seo-description">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="item.uk.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
    <div class="button-wrapper">
      <button @click="saveData">
        {{ $t("save") }} <load v-if="isSave" class="load" />
      </button>
      <template v-if="isNew">
        <button @click="baseVersion">
          {{ $t("baseVersion") }}
        </button>
      </template>
      <template v-if="!isNew">
        <button @click="noAddNew">
          {{ $t("noAddNew") }}
        </button>
      </template>
    </div>
    <popap
      @deleteData="resaveData"
      @noDeleteData="baseVersion"
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
import lang from "../components/Lang.vue";
import oneImage from "../components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import popap from "@/components/films/filmPopap";
import { mapActions, mapGetters } from "vuex";
import load from "../components/Load.vue";
import DB from "../../firebase/index";

import Vue from "vue";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
Vue.component("date-picker", DatePicker);

export default {
  components: {
    lang,
    DatePicker,
    oneImage,
    BigRow,
    popap,
    load
  },
  computed: {
    activeStatusRU() {
      return { active: this.item.ru.status };
    },
    activeStatusUK() {
      return { active: this.item.uk.status };
    },
    index() {
      return this.$route.params.id;
    },
    currentPage() {
      if (this.$route.fullPath.slice(1, 5) === "news") {
        return "news";
      }
      return "actions";
    },
    isActivePopap() {
      return {
        "acive-popap": this.isPopap,
      };
    },
    isNew() {
      return this.index === "new" ? false : true;
    },
    ...mapGetters(["getNewsRow"]),
  },
  methods: {
    ...mapActions(["addNew", "getNews", "saveItem"]),
    showRU() {
      this.item.ru.status = this.item.ru.status ? false : true;
    },
    showUK() {
      this.item.uk.status = this.item.uk.status ? false : true;
    },
    changeLang(lang) {
      this.language = lang;
    },
    changeFileRU(file) {
      this.item.ru.file = file;
    },
    changeShowPreviewTrueRU(bool) {
      this.item.ru.showPreview = bool;
    },
    changeImagePreviewRU(imagePreview) {
      this.item.ru.imagePreview = imagePreview;
    },
    changeFileUK(file) {
      this.item.uk.file = file;
    },
    changeShowPreviewTrueUK(bool) {
      this.item.uk.showPreview = bool;
    },
    changeImagePreviewUK(imagePreview) {
      this.item.uk.imagePreview = imagePreview;
    },
    changeListRU(list) {
      this.item.ru.list = list;
    },
    changeListUK(list) {
      this.item.uk.list = list;
    },
    async resaveData() {
       if(this.currentPage === "news"){
          await DB.getData(`news/${this.index}`).then((newItem)=>{
             this.item = newItem;
             this.isPopap = false;
          })
       }
    },
    baseVersion(){
       this.isPopap = this.isPopap ? false : true;
    },
    saveData() {
      this.isSave = true;
      if (this.isNew) {
        this.saveItem([this.item, this.index, "news"]);
      } else if (this.currentPage === "news") {
        this.addNew([this.item, "news"]);
      }
    },
    getData() {
      if (this.isNew) {
        if (this.currentPage === "news") {
          this.getNews("news");
          this.downloadNews = true;
        }
      }
    },
    noAddNew(){
       this.$router.push('/news')
    }
  },
  watch: {
    getNewsRow: function () {
      if (this.downloadNews) {
        this.item = this.getNewsRow[this.index];
        this.downloadNews = false;
      }
    },
  },
  data: () => ({
    item: {
      ru: {
        title: "Новая новость",
        date: new Date(),
        status: false,
        file: "",
        showPreview: false,
        imagePreview: "",
        description: "",
        linkVideo: "",
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
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
      },
      uk: {
        title: "Нова новина",
        date: new Date(),
        status: false,
        file: "",
        showPreview: false,
        imagePreview: "",
        description: "",
        linkVideo: "",
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
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
      },
    },
    language: "Russian",
    isPopap: false,
    downloadNews: false,
    isSave: false,
  }),
  mounted() {
    this.getData();
  },
};
</script>


<style scoped lang="scss">
.input-check-wrapper {
  position: absolute;
  right: 250px;
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
.seo-wrapper {
  display: flex;
  .input-wrapper {
    display: flex;
    span {
      flex: 0 0 200px;
      text-align: right;
      margin-right: 10px;
    }
    input {
      flex: 0 0 400px;
      margin-bottom: 10px;
    }
    textarea {
      flex: 0 0 400px;
    }
  }
}
.items-wrapper {
  display: flex;
  .item-box {
    &:first-child {
      margin-right: 100px;
    }
  }
}
.item-box {
  display: flex;
  span {
    margin-right: 50px;
  }
  margin-bottom: 50px;
}
textarea {
  resize: none;
  width: 100%;
  height: 100px;
}
input {
  width: 80%;
}
.first-input {
  width: 400px;
  height: 26px;
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
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  button {
     position: relative;
    &:first-child {
      margin-right: 40px;
    }
  }
}
.load {
  position: absolute;
  top: 0;
  right: 0;
}
</style>