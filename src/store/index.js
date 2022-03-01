import Vue from "vue";
import Vuex from "vuex";
import films from "./modules/films";
import cinemas from "./modules/cinemas";
import news from "./modules/news";
import actions from "./modules/actions";


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    films,
    cinemas,
    news,
    actions
  },
});


export default store;
