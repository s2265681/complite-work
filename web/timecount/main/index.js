/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import { getCurrentTimeInfo } from "./js/utils.js";
import countDownInit  from './js/countdown.js'
console.log(getCurrentTimeInfo(), "getCurrentTimeInfo");

console.log(countDownInit,'countDownInit')
window.onload = function(){
  countDownInit()
  console.log('init', weatherCallback)
  weatherCallback.then(res=>{
    console.log(res)
  })
}
