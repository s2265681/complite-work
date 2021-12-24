/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import { getCurrentTimeInfo } from "./js/utils.js";
console.log(getCurrentTimeInfo(), "getCurrentTimeInfo");

var weatherCallback = {
  // day: 
  // night: 
}

window.onload = function(){
  console.log('init', weatherCallback)
  function callback(data) {
    //1.拆解data数据
    var wt = data.weather;
    var currentDay = wt[0];
    var day = currentDay.info.day;
    var night = currentDay.info.night;
    weatherCallback = {
       day:  day[1],
       night: night[1]
    }
    console.log('ccc');
  }
}

function callback(data) {
  //1.拆解data数据
  var wt = data.weather;
  var currentDay = wt[0];
  var day = currentDay.info.day;
  var night = currentDay.info.night;
  weatherCallback = {
     day:  day[1],
     night: night[1]
  }
  console.log('ccc');
}