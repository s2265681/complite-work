


function F1(fn){
    return fn
}

function F2(fn){
    return fn + 'F2'
}

function F3(fn){
    return fn() + 'F3'
}

function compose(...args){
   return  args.reduce((a,b)=> {
       console.log();
      return a(b)
   })
}

console.log(compose(F1,F2,F3))


