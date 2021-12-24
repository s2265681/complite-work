/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import { getCurrentTimeInfo } from "./js/utils.js";
import countDownInit  from './js/countdown.js'

window.YIYAN = "月明星稀，乌鹊南飞";
window.onload = function(){
  countDownInit()
  weatherCallback.then(res=>{
    console.log('当前天气',res)
  })
  console.log('当前时间信息',getCurrentTimeInfo())
}
