const ajax = {
  get(url, fn) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)// 第三个参数异步与否
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
              fn(xhr.responseText)
          }
      }
      xhr.send()
  },
  post(url, data, fn) {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              fn(xhr.responseText)
          }
      }
      xhr.send(data)
  }
}