define(['moduleA'], function (moduleA){
  console.log(moduleB,'moduleB')
  console.log(moduleA)
  return {
    average(...args) {
      args.sort((a,b)=> a-b);
      args.pop();
      args.shift();
      return moduleA.sum(...args) / args.length;
    }
  }
})