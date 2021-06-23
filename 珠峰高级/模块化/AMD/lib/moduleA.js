define(function (){
  return {
    sum(...args) {
      console.log(args,'args>>>')
      return args.reduce((total,item) => {
        return total + item
      })
    }
  }
})