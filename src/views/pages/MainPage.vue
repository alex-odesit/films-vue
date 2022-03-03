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
      <div class="item-box">
        <span class="item-title"> Телефон </span>
        <div class="inputs-first-wrapper">
          <input
            type="number"
            class="item-input first-input"
            v-model="page.ru.numberFirst"
            placeholder="777 56 89"
          />
          <input
            type="number"
            class="item-input first-input"
            v-model="page.ru.numberSecond"
            placeholder="777 56 89"
          />
        </div>
      </div>
      <div class="item-box">
        <span class="item-title"> SEO текст </span>
        <textarea placeholder="текст" v-model="page.ru.seoText"></textarea>
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
      <div class="item-box">
        <span class="item-title"> Телефон </span>
        <div class="inputs-first-wrapper">
          <input
            type="number"
            class="item-input first-input"
            v-model="page.uk.numberFirst"
            placeholder="777 56 89"
          />
          <input
            type="number"
            class="item-input first-input"
            v-model="page.uk.numberSecond"
            placeholder="777 56 89"
          />
        </div>
      </div>
      <div class="item-box">
        <span class="item-title"> SEO текст </span>
        <textarea placeholder="текст" v-model="page.uk.seoText"></textarea>
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
      <button @click="baseVersion">
          {{ $t("baseVersion") }}
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
import load from "../../components/Load.vue";
import { mapActions, mapGetters } from "vuex";
import DB from "../../../firebase/index";
import popap from "@/components/films/filmPopap";

export default {
  components: {
    lang,
    load,
    popap
  },
  data: () => ({
    language: "Russian",
    isSave: false,
    isPopap: false,
    page: {
      ru: {
        title: "Главная страница",
        date: new Date(),
        status: true,
        numberFirst: "",
        numberSecond: "",
        seoText: "",
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
      },
      uk: {
        title: "Головна сторінка",
        date: new Date(),
        status: true,
        numberFirst: "",
        numberSecond: "",
        seoText: "",
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
      },
    },
  }),
  methods: {
    ...mapActions(["savePage", "getPages"]),
    changeLang(lang) {
      this.language = lang;
    },
    showRU() {
      this.page.ru.status = this.page.ru.status ? false : true;
    },
    showUK() {
      this.page.uk.status = this.page.uk.status ? false : true;
    },
    saveData() {
      this.isSave = true;
      this.savePage([this.page, `pages/${this.index}`, this.index]);
    },
    getData() {
      this.getPages("pages");
    },
    async resaveData() {
      await DB.getData(`pages/${this.index}`).then((newItem) => {
        this.page = newItem;
        this.isPopap = false;
      });
    },
    baseVersion() {
      this.isPopap = this.isPopap ? false : true;
    },
  },
  watch: {
    getPagesRow: function () {
      this.page = this.getPagesRow[this.index];
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
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  button {
     &:first-child{
        margin-right: 20px;
     }
    position: relative;
  }
}
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
.item-box {
  display: flex;
  span {
    margin-right: 50px;
  }
  margin-bottom: 50px;
}
textarea {
  resize: none;
  width: 90%;
  height: 100px;
}
input {
  width: 80%;
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
      flex: 0 0 600px;
      margin-bottom: 10px;
    }
    textarea {
      flex: 0 0 600px;
    }
  }
}
.inputs-first-wrapper {
  input {
    &:first-child {
      margin-bottom: 10px;
    }
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.load {
  position: absolute;
  top: 0;
  right: 0;
}
button {
  position: relative;
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