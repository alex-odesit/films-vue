<template>
  <div>
    <list
      :title="'Список страниц'"
      :btn="'Создать новую'"
      @addItem="addItem"
      :list="pages"
      :type="'pages'"
    />
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

import list from "../components/List.vue";
export default {
  components: {
    list,
  },
  data: () => ({
    pages: [
      {
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
      {
        ru: {
          title: "О кинотеатре",
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
          title: "О кінотетрі",
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
      {
        ru: {
          title: "Кафе-бар",
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
          title: "Кафе-бар",
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
      {
        ru: {
          title: "Vip-зал",
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
          title: "Vip-зал",
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
      {
        ru: {
          title: "Реклама",
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
          title: "Реклама",
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
      {
        ru: {
          title: "Детская комната",
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
          title: "Дитяча кімната",
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
      {
        ru: {
          title: "Контакты",
          date: new Date(),
          status:true,
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
    ],
  }),
  methods: {
    ...mapActions(["getPages"]),
    getData() {
      this.getPages("pages");
    },
    test(){
      console.log(this.getPagesRow);
    },
    addItem() {
      this.$router.push("/pages/edit/new");
    },
  },
  watch: {
    getPagesRow: function () {
      this.pages = this.getPagesRow;
    },
  },
  computed: {
    ...mapGetters(["getPagesRow"]),
  },
  mounted() {
    this.getData();
  },
};
</script>



<style scoped lang="scss">
</style>