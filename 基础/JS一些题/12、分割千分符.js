function format(num){
  // 请实现 ...
  let n = String(num)
  if(n < 1) return n;
  if(n.includes('.')){
    let left = n.split('.')[0]
    let right = n.split('.')[1]
    return  fn(String(left)) + '.' + right
  }
  function fn(num){
    //   console.log(num,'num....')
     let reg = /(\d{1,3})(?=(\d{3})+$)/g
      let result = num.replace(reg,(a,b,c)=>{
          console.log(a,b,c)
        return  a + '.'
      })
      return result
  }
  return fn(n)
}
// let f = format(12345.6789)
console.log(format(12345.6789));
console.log(format(1231212121214567));
console.log(format(0.1234567));