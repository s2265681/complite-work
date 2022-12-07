import { config } from '../config.js'

const tips ={
   1:'抱歉，出现了一个错误',
   1005:'appkey无效',
   3000:'期刊不存在',
   1007:'错误'
}
class HTTP {
  request({url,data,method}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject,data, method)
    })
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  _request(url, resolve, reject, data = {}, method = "GET") {
    var that = this
    var url = config.api_blink_url + url;
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': 'RdshydjBvcYZhMZC'
      },
      success: (res)=> {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        const code = res.statusCode.toString();
        const startChar = code.charAt(0);
        if (startChar == '2') {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this.show_error(error_code)
        }
     
      },
      fail:  (err)=> {
        reject()
        this.show_error(1)
      }
    });
    
  }

  show_error(error_code) {
    console.log(error_code)
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ?tip:tips[error_code],
      icon:'none',
      duration:2000
    })
  }

};


export { HTTP };