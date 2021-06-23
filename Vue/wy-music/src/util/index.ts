

/**
 * 查看历史记录
 * @param 
 */
const getHistory = function () {
  return JSON.parse(localStorage.getItem('cm_search_history'))
}
/**
 * 添加历史记录
 * @param item 
 */
const addHistory = function (item) {
  const historyList = getHistory() || [];
  const uniqueL = historyList?.filter(el => el.first === item.first);
  if (item.first && uniqueL.length === 0) {
    historyList.push(item)
    localStorage.setItem('cm_search_history', JSON.stringify(historyList))
  }
}
/**
 * 删除历史记录
 * @param item 
 */
const deleteHistory = function (item) {
  const historyList = getHistory() || [];
  if (item.first) {
    const uniqueL = historyList?.filter(el => el.first !== item.first);
    localStorage.setItem('cm_search_history', JSON.stringify(uniqueL))
  }
}

/**
 * 时间戳转化成年月日
 * 
 */
//时间戳转换成日期时间(年月日)
function toDataTime(unixtime) {
  const dateTime: any = new Date(parseInt(unixtime) * 1000)
  const year = dateTime.getFullYear();
  let month: any = dateTime.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = "0" + month;
  }
  let day: any = dateTime.getDate();
  if (day > 0 && day < 10) {
    day = "0" + day;
  }
  const timeSpanStr = year + '-' + month + '-' + day;
  return timeSpanStr;
}


export {
  addHistory,
  deleteHistory,
  getHistory,
  toDataTime
}