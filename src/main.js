import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {i18n} from "./i18n/i18n"

import DB from "../firebase/index";
DB.boot();

import { library } from "@fortawesome/fontawesome-svg-core";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faPowerOff, faPen, faTrash);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

// css files
import "vue2-admin-lte/src/lib/css";

// js files
import "vue2-admin-lte/src/lib/script";

import i18n from "./i18n";

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
