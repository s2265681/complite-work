const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
function deepClone(target){
   if(typeof target === 'object' && typeof target !== 'null'){
        let cloneTarget = Array.isArray(target) ? [] : {};
         for(let key in target){
             cloneTarget[key] = deepClone(target[key])
         }
        return cloneTarget
   }else{
     return  target
   }
}
let newObj = deepClone(target)
target.field3.child = '111'
console.log(target)
console.log(newObj)