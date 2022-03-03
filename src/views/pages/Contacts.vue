<template>
  <div class="wrapper-component">
    <div class="input-check-wrapper" :class="activeStatus">
      <span @click="show"></span>
      <input type="checkbox" v-model="page.ru.status" />
      <div class="input-check-title">
        {{ page.ru.status ? "вкл" : "выкл" }}
      </div>
    </div>
    <div class="wrapper-items">
      <item
        v-for="(item, id) in page.ru.list"
        :key="id"
        :item="item"
        :id="id"
        @deleteCinema="deleteCinema"
      />
    </div>
    <button @click="addCinema" class="add-item">Добавить ещё кинотеатр</button>
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
import item from "../../components/contacts/ContactItem";
import load from "../../components/Load.vue";
import popap from "@/components/films/filmPopap";
import { mapActions, mapGetters } from "vuex";
import DB from "../../../firebase/index";

export default {
  components: {
    item,
    load,
    popap,
  },
  data: () => ({
    page: {
      ru: {
        title: "Контакты",
        date: new Date(),
        status: true,
        list: [
          {
            nameCinema: "Первый",
            adress: "",
            localeMap: "",
            file: "",
            showPreview: false,
            imagePreview: "",
            status: true,
          },
          {
            nameCinema: "второй",
            adress: "",
            localeMap: "",
            file: "",
            showPreview: false,
            imagePreview: "",
            status: true,
          },
        ],
        url: "",
        titleSeo: "",
        keywords: "",
        seoDescription: "",
      },
    },
    isSave: false,
    isPopap: false,
  }),
  computed: {
    activeStatus() {
      return { active: this.page.ru.status };
    },
    isActivePopap() {
      return {
        "acive-popap": this.isPopap,
      };
    },
    index() {
      return this.$route.params.id;
    },
    ...mapGetters(['getPagesRow'])
  },
  methods: {
    ...mapActions(["savePage","getPages"]),
    addCinema() {
      const cinema = {
        nameCinema: "Новый кинотетр",
        adress: "",
        localeMap: "",
        file: "",
        showPreview: false,
        imagePreview: "",
        status: true,
      };
      this.page.ru.list.push(cinema);
    },
    getData() {
      this.getPages("pages");
    },
    saveData() {
      this.isSave = true;
      this.savePage([this.page, `pages/${this.index}`, this.index]);
    },
    show() {
      this.page.ru.status = this.page.ru.status ? false : true;
    },
    baseVersion() {
      this.isPopap = this.isPopap ? false : true;
    },
    async resaveData() {
      await DB.getData(`pages/${this.index}`).then((newItem) => {
        this.page = newItem;
        this.isPopap = false;
      });
    },
    deleteCinema(index) {
      this.page.ru.list.splice(index, 1);
    },
  },
  watch: {
    getPagesRow: function () {
      if(this.getPagesRow[this.index]){
         this.page = this.getPagesRow[this.index];
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


<style scoped lang="scss">
.wrapper-component {
  text-align: center;
}
.add-item {
  font-size: 18px;
}
.wrapper-items {
  margin-top: 50px;
}
.input-check-wrapper {
  position: absolute;
  right: 190px;
  top: 20px;
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
  margin-top: 30px;
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
textarea {
  resize: none;
  width: 100%;
  height: 100px;
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
</style>