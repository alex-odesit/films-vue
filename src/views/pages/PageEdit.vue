<template>
  <div class="wrapper-component">
    <lang :language="language" @changeLang="changeLang" />

    <template v-if="language === 'Russian'">
      <div class="input-check-wrapper" :class="activeStatusRU">
        <span @click="showRU"></span>
        <input type="checkbox" v-model="page.ru.status" />
        <div class="input-check-title">
          {{ page.ru.status ? "вкл" : "выкл" }}
        </div>
      </div>
      <div class="item-box item-box-above">
        <span class="item-title"> {{ $t("name") }} </span>
        <input
          type="text"
          v-model="page.ru.title"
          placeholder="название страницы"
        />
      </div>
      <div class="item-box">
        <span class="item-title"> {{ $t("descriptionFilm") }} </span>
        <textarea
          v-model="page.ru.description"
          placeholder="описание"
        ></textarea>
      </div>
      <div class="item-box">
        <span class="item-title"> {{ $t("mainPicture") }} </span>
        <oneImage
          @changeimagePreview="changeImagePreviewRU"
          @changeShowPreview="changeShowPreviewTrueRU"
          @changeFile="changeFileRU"
          :imagePreview="page.ru.imagePreview"
          :showPreview="page.ru.showPreview"
          :file="page.ru.file"
          :databaselink="`pages/${index}/ru/imagePreview`"
          :save="false"
          :download="false"
        />
      </div>
      <div class="item-box">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="page.ru.list"
          :databaseLink="`pages/${index}/ru/list`"
          :index="String(index)"
          class="big-row"
          @changeList="changeListRU"
        />
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper">
            <span> URL: </span>
            <input v-model="page.ru.url" placeholder="URL" />
          </div>
          <div class="input-wrapper">
            <span> Title: </span>
            <input v-model="page.ru.titleSeo" placeholder="Title" />
          </div>
          <div class="input-wrapper">
            <span> Keywords: </span>
            <input v-model="page.ru.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="page.ru.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </template>

    <template v-if="language === 'Ukraine'">
      <div class="input-check-wrapper" :class="activeStatusUK">
        <span @click="showUK"></span>
        <input type="checkbox" v-model="page.uk.status" />
        <div class="input-check-title">
          {{ page.uk.status ? "вкл" : "выкл" }}
        </div>
      </div>
      <div class="item-box item-box-above">
        <span class="item-title"> {{ $t("name") }} </span>
        <input
          type="text"
          v-model="page.uk.title"
          placeholder="название страницы"
        />
      </div>
      <div class="item-box">
        <span class="item-title"> {{ $t("descriptionFilm") }} </span>
        <textarea
          v-model="page.uk.description"
          placeholder="описание"
        ></textarea>
      </div>
      <div class="item-box">
        <span class="item-title"> {{ $t("mainPicture") }} </span>
        <oneImage
          @changeimagePreview="changeImagePreviewUK"
          @changeShowPreview="changeShowPreviewTrueUK"
          @changeFile="changeFileUK"
          :imagePreview="page.uk.imagePreview"
          :showPreview="page.uk.showPreview"
          :file="page.uk.file"
          :databaselink="`pages/${index}/uk/imagePreview`"
          :save="false"
          :download="false"
        />
      </div>
      <div class="item-box">
        <span> {{ $t("sizePicture") }} 1000x190 </span>
        <BigRow
          :isText="false"
          :isUrl="false"
          :download="false"
          :lists="page.uk.list"
          :databaseLink="`pages/${index}/uk/list`"
          :index="String(index)"
          class="big-row"
          @changeList="changeListUK"
        />
      </div>
      <div class="seo-wrapper">
        <span class="seo-wrapper-title"> SEO блок </span>
        <div class="seo-input-wrapper">
          <div class="input-wrapper">
            <span> URL: </span>
            <input v-model="page.uk.url" placeholder="URL" />
          </div>
          <div class="input-wrapper">
            <span> Title: </span>
            <input v-model="page.uk.titleSeo" placeholder="Title" />
          </div>
          <div class="input-wrapper">
            <span> Keywords: </span>
            <input v-model="page.uk.keywords" placeholder="Keywords" />
          </div>
          <div class="input-wrapper">
            <span> Description: </span>
            <textarea
              placeholder="seoDescription"
              v-model="page.uk.seoDescription"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
    <div class="button-wrapper">
      <button @click="saveData">
        {{ $t("save") }} <load v-if="isSave" class="load" />
      </button>
      <button v-if="index!=='new'" @click="baseVersion">
        {{ $t("baseVersion") }}
      </button>
      <button @click="noAddNew" v-if="index==='new'">
        Не добавлять новую страницу
      </button>
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
import lang from "../../components/Lang.vue";
import oneImage from "@/components/addImageOne.vue";
import BigRow from "@/components/BigRow";
import load from "../../components/Load.vue";
import popap from "@/components/films/filmPopap";
import { mapActions, mapGetters } from "vuex";
import DB from "../../../firebase/index";

export default {
  components: {
    lang,
    oneImage,
    BigRow,
    load,
    popap,
  },
  watch: {
    getPagesRow: function () {
      if(this.getPagesRow[this.index]){
         this.page = this.getPagesRow[this.index];
      }
    },
  },
  data: () => ({
    language: "Russian",
    isSave: false,
    isPopap: false,
    page: {
      ru: {
        title: "Новая страница",
        date: new Date(),
        status: true,
        description: "",
        file: "",
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
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
      },
      uk: {
        title: "Нова сторінка",
        date: new Date(),
        status: true,
        description: "",
        file: "",
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
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
      },
    },
  }),
  methods: {
    ...mapActions(["savePage", "getPages","addNewPage"]),
    saveData() {
      this.isSave = true;
      if(this.index !=='new'){
        this.savePage([this.page, `pages/${this.index}`, this.index]);
      }else{
        this.addNewPage(this.page)
      }
    },
    baseVersion() {
      this.isPopap = this.isPopap ? false : true;
    },
    changeLang(lang) {
      this.language = lang;
    },
    showRU() {
      this.page.ru.status = this.page.ru.status ? false : true;
    },
    showUK() {
      this.page.uk.status = this.page.uk.status ? false : true;
    },
    changeFileRU(file) {
      this.page.ru.file = file;
    },
    changeShowPreviewTrueRU(bool) {
      this.page.ru.showPreview = bool;
    },
    changeImagePreviewRU(imagePreview) {
      this.page.ru.imagePreview = imagePreview;
    },
    changeFileUK(file) {
      this.page.uk.file = file;
    },
    changeShowPreviewTrueUK(bool) {
      this.page.uk.showPreview = bool;
    },
    changeImagePreviewUK(imagePreview) {
      this.page.uk.imagePreview = imagePreview;
    },
    changeListRU(list) {
      this.page.ru.list = list;
    },
    changeListUK(list) {
      this.page.uk.list = list;
    },
    noAddNew(){
      this.$router.push({ path: "/pages" });
    },
    async resaveData() {
      await DB.getData(`pages/${this.index}`).then((newItem) => {
        this.page = newItem;
        this.isPopap = false;
      });
    },
    getData() {
      this.getPages("pages");
    },
  },
  computed: {
     ...mapGetters(["getPagesRow"]),
    activeStatusRU() {
      return { active: this.page.ru.status };
    },
    activeStatusUK() {
      return { active: this.page.uk.status };
    },
    index() {
      return this.$route.params.id;
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
  width: 50%;
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
.item-box-above {
  margin-top: 30px;
}
</style>