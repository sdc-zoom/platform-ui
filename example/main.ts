import Vue from "vue";
import App from "ex/App.vue";
import router from "./router";
import store from "./store";

import PlatformUI from "@/index";

Vue.use(PlatformUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
