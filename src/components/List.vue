<template>
  <div class="list-wrapper">
    <div class="title">
      {{ title }}
    </div>
    <button @click="addItem" class="add-item">
      {{ btn }}
    </button>
    <div class="list-box">
      <div class="item item-box">
        <div class="each-item item-title">Название</div>
        <div class="each-item item-date">Дата создания</div>
        <div class="each-item item-status">Статус</div>
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="each-item item-title">
          {{ item.ru.title }}
        </div>
        <div class="each-item item-date">
          {{ item.ru.date | getDate }}
        </div>
        <div class="each-item item-status">
          {{ item.ru.status ? "вкл" : "выкл" }}
        </div>
        <div class="font-awesome-box">
          <font-awesome-icon
            class="font-awesome"
            icon="fa-solid fa-pen"
            @click="edit(index)"
          />
          <font-awesome-icon
            @click="deleteItem(index)"
            class="font-awesome"
            icon="fa-solid fa-trash"
          />
        </div>
      </div>
    </div>
    <popap
      @deleteData="deleteData"
      @noDeleteData="noDeleteData"
      class="popap"
      :class="isActivePopap"
      :array="['Вы действительно хотите удалить?', 'Нет', 'Удалить']"
    />
  </div>
</template>




<script>
import popap from "@/components/films/filmPopap";
import { mapActions } from "vuex";

export default {
  props: ["title", "btn", "list", "type"],
  components: {
    popap,
  },
  data: () => ({
    isPopap: false,
    indexDelete: null,
  }),
  methods: {
    ...mapActions(["deleteNew", "deleteAction"]),
    edit(index) {
      if (this.$router.history.current.fullPath === "/news") {
        this.$router.push(`/news/edit/${index}`);
      } else {
        this.$router.push(`/actions/edit/${index}`);
      }
    },
    addItem() {
      this.$emit("addItem");
    },
    deleteData() {
      if (this.type === "news") {
        this.deleteNew(this.indexDelete);
        this.isPopap = false;
      } else {
        this.deleteAction(this.indexDelete);
        this.isPopap = false;
      }
    },
    noDeleteData() {
      this.isPopap = false;
    },
    deleteItem(index) {
      this.isPopap = true;
      this.indexDelete = index;
    },
  },
  computed: {
    isActivePopap() {
      return {
        "acive-popap": this.isPopap,
      };
    },
  },
  filters: {
    getDate: function (dateString) {
      let date = Date.parse(dateString);
      date = new Date(date);
      let day =
        date.getDate() < 10 ? "0" + `${date.getDate()}` : date.getDate();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + `${date.getMonth() + 1}`
          : date.getMonth() + 1;
      return `${day}.${month}.${date.getFullYear()}`;
    },
  },
};
</script>




<style scoped lang="scss">
.list-wrapper {
  padding: 30px;
}
.title {
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 30px;
}
.add-item {
  position: absolute;
  top: 50px;
  right: 100px;
  font-size: 22px;
}
.item-title {
  flex: 0 0 40%;
}
.item-date {
  flex: 0 0 30%;
}
.item-status {
  flex: 0 0 15%;
}
.item {
  display: flex;
  &:nth-child(2n + 1) {
    .each-item {
      background-color: #ececec;
    }
  }
}
.each-item {
  border: 1px solid #000;
  padding: 10px;
}
.font-awesome-box {
  flex: 0 0 15%;
  display: flex;
  padding: 0px 10px 0px 10px;
  align-items: center;
}
.font-awesome {
  font-size: 25px;
  cursor: pointer;
  &:first-child {
    margin-right: 30px;
  }
}
.item-box {
  .each-item {
    background-color: #cccccc !important;
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
</style>