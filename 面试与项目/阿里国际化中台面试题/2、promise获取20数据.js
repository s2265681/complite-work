// 第二题 promise 
let mockData = [
  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
  96, 97, 98, 99
]
/*
 * @params: size 每次获取的条数
 * @params: count 一共获取多少条
 * @return: Promise对象 通过then方法可以获取取到的数据
 */
function getData (size, count) {
    // debugger
  let finalData = []
  function func (start, end) {
    return new Promise ((resolve, reject) => {
      function mockReq (start, end) {
        setTimeout(() => {
          let data = mockData.slice(start, end)
          resolve(data)
        },100)
      }
      mockReq(start, end)
    }).then((data) => {
      finalData.push(...data)
      // 终止条件 当数据的条数大于 数据源 或者 每次的数据小于 每次获取的条数时  终止返回
      if (finalData.length >= count || data.length < size) {
        return new Promise((resolve, reject) => {
          resolve(finalData)
        })
      } else {
        start += size
        console.log(start, start + size);
        return func(start, start + size)
      }
    })
  }
  return func(0, size)
}
getData(20, 100).then((data) => {
  console.log(data)
})