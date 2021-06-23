import VueRouter from 'vue-router'
import About from './views/About.vue'

// const Foo = { template: "<div>foo</div>" };
// const Bar = { template: "<div>bar</div>" };
const routes = [
  { path: "/about", component: About },
];
const router = new VueRouter({
  routes
});
export default router
