function Promise(excetor){
    let _this = this;
        _this.PromiseStatus = "pedding",
        _this.PromiseResult = null,
        _this.callbacks = [];
  
    function resolve(value){
       if(_this.PromiseStatus!=='pedding')return
       _this.PromiseStatus = 'fulfilled' 
       _this.PromiseResult = value;
       _this.callbacks.forEach(item=>{
          setTimeout(()=>{
            item.resolveFun()
          })
       })
    }
  
    function reject(reason){
       if(_this.PromiseStatus!=='pedding')return
       _this.PromiseStatus = 'rejected' 
       _this.PromiseResult = reason;
       _this.callbacks.forEach(item=>{
          setTimeout(()=>{
             item.rejectFun()
          })
       })
    }
  
    try{
      excetor(resolve,reject)  
    }catch(error){
       reject(error)
       throw 'promise 内部错误' + error
    }
}

Promise.prototype.then = function(resolveFun,rejectFun){
    let _this = this;
  if(typeof resolveFun!=='function')resolveFun = value=>value;
  if(typeof rejectFun!=='function') rejectFun = reason => { throw reason };
 
  return new Promise((resolve,reject)=>{
       function dealStatus(type){
           try{
             let result = type(_this.PromiseResult)
             if(result instanceof Promise){
               result.then(v=>{
                 resolve(v)
               },r=>{
                 reject(r)
               })
             }else{
               resolve(result)
             }
           }catch(error){
             reject(error)
           }
        }
      if(_this.PromiseStatus === 'fulfilled'){
          setTimeout(()=>{
             dealStatus(resolveFun)
          })
      }
      if(_this.PromiseStatus === 'rejected'){
         setTimeout(()=>{
            dealStatus(rejectFun)
          })
      }
      if(_this.PromiseStatus === 'pedding'){
          this.callbacks.push({
            resolveFun:function(){
                dealStatus(resolveFun)
            },
            rejectFun:function(){
               dealStatus(rejectFun)
            }
          })
      }
  })
}

Promise.prototype.catch=function(rejectFun){
   return this.then(undefined,rejectFun)
}

Promise.resolve = function(value){
   return new Promise((resolve,reject) => {
       if(value instanceof Promise){
           value.then(v=>{
              resolve(v)
           },r=>{
              reject(r)
           })
       }else{
         resolve(value)
       }
   })
}

Promise.reject = function(reason){
   return new Promise((resolve,reject) => {
       reject(reason)
   })
}

Promise.all = function(promises){
   let count, arr=[];
   return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
         promises[i].then(v=>{
              count++
              arr[i] = v
              if(count === promises.length){
                 resolve(arr)
              }
         },r=>{
             reject(r)
         })
      }
   })
}

Promise.race = function(promises){
     return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
         promises[i].then(v=>{
            resolve(v)
         },r=>{
           reject(r)
         })
      }
   })
}