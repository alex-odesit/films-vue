import Vue from "vue";
import Vuex from "vuex";
import films from "./modules/films"

Vue.use(Vuex);

 const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    films
  }
});

// store.dispatch('initFilmsStore');

export default store;
