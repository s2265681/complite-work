
// other.ts
export const clone = d => JSON.parse(JSON.stringify(d))

// 将一维数组按长度 m 分割成二维数组，最后一组不足 m，不传 fill 默认不补
export const mod = (arr, m, fill): any[] => {
  arr = arr || []
  m < 0 && (m = 0)
  m = m || 3
  let ret: any[] = []
  for (let i = 0; i < arr.length; i += m) {
    let row: any[] = []
    for (let j = 0; j < m; ++j) {
      let col = arr[i + j]
      if (fill === undefined) {
        col && row.push(col)
      } else {
        row.push(col || fill)
      }
    }
    ret.push(row)
  }
  return ret
}

// setTimeout 语法糖
export function sleep (delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

// 获取当前时间，为将来扩展为从服务器取时间
export async function getNow () {
  return Date.now()
}

// 补0
export const pad = (num: any, n: number = 2) => {
  num = num || ''
  let len = num.toString().length
  while (len < n) {
    num = `0${num}`
    len++
  }
  return num
}