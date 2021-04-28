// 转化时间字符串，解决兼容性 bug
export function transDateStr (time: string) {
    return time.replace(/-/g, '/') // iOS 兼容
  }
  
  // 格式化时间
  export function formatDate (time: string | number | Date, fmt: string = 'YYYY-MM-DD hh:mm:ss') {
    if (typeof time === 'string') {
      time = transDateStr(time)
    }
    let d = new Date(time)
    if (!fmt) return time
    let obj = {
      'M+': d.getMonth() + 1,
      'D+': d.getDate(),
      'h+': d.getHours(),
      'm+': d.getMinutes(),
      's+': d.getSeconds(),
      'q+': Math.floor((d.getMonth() + 3) / 3),
      'S': d.getMilliseconds()
    }
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let key in obj) {
      if (new RegExp('(' + key + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1, (RegExp.$1.length === 1)
            ? (obj[key])
            : (('00' + obj[key]).substr(('' + obj[key]).length)))
      }
    }
    return fmt
  }