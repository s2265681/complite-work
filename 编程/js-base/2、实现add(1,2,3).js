


let add = (a,b,c) => a+b+c

// console.log(add(1,2,3))

const curry = (fn) =>  (temp = (...args)  =>  args.length === fn.length ? fn(...args) : (...arg) => temp(...arg,...args))

  
  let curryAdd = curry(add)
  console.log(curryAdd)
  console.log(curryAdd(1,2),3)
//   console.log(a)