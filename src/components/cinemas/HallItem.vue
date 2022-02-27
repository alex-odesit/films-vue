<template class="test">
  <div>
    <div class="hall hall-item-row">
      <div class="hall-item">
        {{ nameHall}}
      </div>
      <div class="hall-item">
        {{ item.date }}
      </div>
      <div class="font-awesome-box">
        <font-awesome-icon
          @click="edit"
          class="font-awesome"
          icon="fa-solid fa-pen"
        />
        <font-awesome-icon
          @click="remove"
          v-if="isTrash"
          class="font-awesome"
          icon="fa-solid fa-trash"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["item", "index", "cinema", "halls"],
  methods: {
    ...mapActions(["timeSave"]),
    edit() {
      this.timeSave(this.cinema);
      this.$router.push(`/cinemas/cinema/${this.id}/hall/${this.index}`);
    },
    remove() {
      this.$emit("removeHall", this.index);
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isTrash() {
      return this.halls.length === 1 ? false : true;
    },
    nameHall(){
      return this.$i18n.locale === 'ru'? this.item.ru.name:this.item.uk.name;
    }
  },
};
</script>

<style scoped lang="scss">
.hall {
  display: flex;
  align-items: center;
}
.hall-item-row {
}
.hall-item {
  padding: 10px;
  border: 1px solid #000;
  &:first-child {
    flex: 0 0 40%;
  }
  &:nth-child(2) {
    flex: 0 0 50%;
  }
}
.font-awesome-box {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  height: 47.7px;
  background-color: #fff;
  padding-top: 10px;
}
.font-awesome {
  font-size: 22px;
  cursor: pointer;
  &:first-child {
    margin-left: 30px;
  }
}
</style>
