// import { str } from "./moduleA.js";
// console.log("vite..." + str);
import { createApp, h } from "vue";
import App from "./App.vue";
import "./index.css";

// const App = {
//   render() {
//     return h("div", null, [h("div", null, String("Hello Vite"))]);
//   },
//   setup() {
//     console.log("setup....");
//     const count = ref(6);
//     function add() {
//       count.value++;
//     }
//     return {
//       count,
//     };
//   },
// };

// console.log(App, "App....");
createApp(App).mount("#app");
