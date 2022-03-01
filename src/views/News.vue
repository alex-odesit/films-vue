<template>
  <div>
    <list
      :title="'Список новостей'"
      :btn="'Создать новость'"
      @addItem="addItem"
      :list="news"
      :type="'news'"
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
    news: []
  }),
  methods: {
    ...mapActions(["getNews"]),
    getData() {
      this.getNews("news");
    },
    addItem(){
      this.$router.push('/news/edit/new')
    }
  },
  watch: {
    getNewsRow: function () {
      this.news = this.getNewsRow;
    },
  },
  computed: {
    ...mapGetters(["getNewsRow"]),
  },
  mounted() {
    this.getData();
  },
};
</script>



<style scoped lang="scss">
</style>