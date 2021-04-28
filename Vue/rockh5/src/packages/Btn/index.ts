import Btn from './src/btn.vue'
import BtnGroup from './src/btnGroup.vue'
Btn.install = function (Vue) {
  Vue.component(Btn.name, Btn)
}
BtnGroup.install = function (Vue) {
  Vue.component(BtnGroup.name, BtnGroup)
}
export { Btn, BtnGroup }