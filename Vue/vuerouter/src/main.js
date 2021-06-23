import Vue from "vue/dist/vue.esm.js";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
Vue.use(VueRouter)
new Vue({
  el: "#app",
  router,
  components: {
    App,
  },
  template: "<App/>",
});
