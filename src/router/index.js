import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Statistic",
    component: () => import("../views/Statistic.vue"),
    props: true,
  },
  {
    path: "/banners",
    name: "Banners",
    component: () => import("@/views/Banners"),
    props: true,
  },
  {
    path: "/films",
    name: "Films",
    component: () => import("@/views/Films"),
    props: true,
  },
  {
    path: "/films/:type/:id",
    component: () => import("@/views/FilmEdit"),
  },
  {
    path: "/cinemas",
    name: "Cinemas",
    component: () => import("../views/Cinemas"),
  },
  {
    path: "/cinemas/cinema/:id",
    component: () => import("../views/CinemaEdit"),
  },
  {
    path: "/cinemas/cinema/:id/:edit",
    component: () => import("../views/CinemaEdit"),
  },
  {
    path: "/cinemas/cinema/:id/hall/:index",
    component: () => import("../views/HallEdit"),
  },
  {
    path: "/news",
    component: () => import("../views/News"),
  },
  {
    path: "/news/edit/:id",
    component: () => import("../views/EditNewsAndActions"),
  },
  {
    path: "/actions",
    component: () => import("../views/Actions"),
  },
  {
    path: "/actions/edit/:id",
    component: () => import("../views/EditNewsAndActions"),
  },
  {
    path: "/pages",
    component: () => import("../views/Pages"),
  },
  {
    path: "/pages/mainPage/:id",
    component: () => import("../views/pages/MainPage"),
  },
  {
    path: "/pages/edit/:id",
    component: () => import("../views/pages/PageEdit"),
  },
  {
    path: "/pages/contacts/:id",
    component: () => import("../views/pages/Contacts"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
