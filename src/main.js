import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";



import DB from "../firebase/index";
DB.boot();


library.add(fas, fab);
Vue.config.productionTip = false;
Vue.component("fa", FontAwesomeIcon);
Vue.config.productionTip = false;



// css files
import "vue2-admin-lte/src/lib/css";
// js files
import "vue2-admin-lte/src/lib/script";


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
