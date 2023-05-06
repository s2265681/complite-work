// import { str } from "./moduleA.js";
// console.log("vite..." + str);

import { createApp, h } from "vue";

const App = {
  render() {
    return h("div", null, [h("div", null, String("Hello Vite"))]);
  },
};

createApp(App).mount("#app");
