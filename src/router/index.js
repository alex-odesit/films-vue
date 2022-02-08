import Vue from "vue";
import VueRouter from "vue-router";

// import Films from '../views/Films'


// import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Statistic",
    component: () => import("../views/Statistic.vue"),
    props: true
  },
  {
    path: "/banners",
    name: "Banners",
    component: () => import('@/views/Banners'),
    props: true
  },
  {
    path: "/films",
    name: "Films",
    component: () => import('@/views/Films'),
    props: true
  },
  {
    path: "/films/film",
    name: "Film",
    component: () => import('@/views/FilmEdit'),
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.afterEach((to, from) => {
//   if (to.name === 'Film' && from.name === 'Films') {
//     store.dispatch('addNewFilm', Films.data().films);
//     store.dispatch('addChangePage');
//     console.log(Films.data().films);
//   };
// })

export default router;
