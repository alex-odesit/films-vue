<template>
  <div>
    <router-link
      v-for="link in itemName"
      :key="link.url"
      tag="div"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
      class="link-nav"
    >
      <div class="item">
        {{ link.name }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    itemName: [
      { name: "Статистика", url: "/", exact: true },
      { name: "Банера/Слайдеры", url: "/banners" },
      { name: "Фильмы", url: "/films" },
      { name: "Кинотеатры", url: "/cinemas" },
      { name: "Новости", url: "/f" },
      { name: "Акции", url: "/g" },
      { name: "Страницы", url: "/h" },
      { name: "Пользователи", url: "/j" },
      { name: "Рассылка", url: "/k" },
    ],
  }),
};
</script>

<style scoped lang="scss">
.item {
  padding: 10px 50px 10px 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid rgb(255, 255, 255);
}
.item:hover {
  background: rgb(196, 191, 191);
  border: 1px solid rgb(0, 0, 0);
}
.link-nav {
  &.active {
    .item {
      background: rgb(226, 226, 226);
      border: 1px solid rgb(95, 95, 95);
    }
  }
}
</style>
