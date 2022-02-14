import Vue from "vue";
import Vuex from "vuex";
import films from "./modules/films"
import cinemas from "./modules/cinemas"

Vue.use(Vuex);

 const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    films,
    cinemas
  }
});

// store.dispatch('initFilmsStore');

export default store;
