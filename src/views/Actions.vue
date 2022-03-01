<template>
  <div>
    <list
      :title="'Список акций'"
      :btn="'Создать акцию'"
      @addItem="addItem"
      :list="actions"
      :type="'actions'"
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
    actions: []
  }),
  methods: {
    ...mapActions(["getActions"]),
    getData() {
      this.getActions("actions");
    },
    addItem(){
      this.$router.push('/actions/edit/new')
    }
  },
  watch: {
    getActionsRow: function () {
      this.actions = this.getActionsRow;
    },
  },
  computed: {
    ...mapGetters(["getActionsRow"]),
  },
  mounted() {
    this.getData();
  },
};
</script>



<style scoped lang="scss">
</style>