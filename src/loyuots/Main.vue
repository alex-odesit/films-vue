<template>
  <div>
    <div class="main-header">
      <Header />
    </div>
    <div class="wrapper">
      <div class="sidebar-wrapper">
        <SlideBar />
      </div>
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SlideBar from "@/components/SlideBarItem";

export default {
  components: {
    Header,
    SlideBar,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.sidebar-wrapper {
  flex: 0 0 250px;
}
.content-wrapper {
  margin: 0 !important;
  width: 100%;
  padding: 30px;
  background-color: #fff !important;
}

.sidebar-wrapper {
  border-right: 3px solid #000;
}
</style>
