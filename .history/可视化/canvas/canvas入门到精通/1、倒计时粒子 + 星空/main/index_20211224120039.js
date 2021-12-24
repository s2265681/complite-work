/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import { getCurrentTimeInfo } from "./js/utils.js";
console.log(getCurrentTimeInfo(), "getCurrentTimeInfo");




// 回调天气
function callback(data) {
  //1.拆解data数据
  var wt = data.weather;
  var currentDay = wt[0];
  var day = currentDay.info.day;
  var night = currentDay.info.night;
  console.log("白天天气:", day[1]);
  console.log("夜晚天气:", night[1]);
}

