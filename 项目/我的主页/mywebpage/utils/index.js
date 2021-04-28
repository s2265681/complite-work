// 解析url地址
// export default{
// getUrlKey: function (name) {
// return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
// }
// }
// const dev_url="http://localhost:60001/api"  // 本地
const pro_url="http://39.96.71.193:60001/api"
export default {
    // url:dev_url,
    url:pro_url  // 线上
}