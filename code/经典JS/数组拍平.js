



const muchArr = [
    [1,2,3,4,5],[6,7,8,9,0, [12,13,14]]
]

// 1、递归实现
// function flat(arr){
//    let newArr = []
//    arr.forEach(element => {
//        if(element instanceof Array){
//             newArr = newArr.concat(flat(element))
//        }else{
//             newArr.push(element)
//        }
//    });
//    return newArr
// }

// 2、reduce实现

// function flat(arr){
//     return arr.reduce((prev,cur)=>{
//         return prev.concat(Array.isArray(cur)?flat(cur):cur)
//     },[])
// }
// 一行代码实现拍平reduce
// const flat=(arr)=>arr.reduce((prev,cur)=>(prev.concat(Array.isArray(cur)?flat(cur):cur)),[])



// 4、 使用toString
// const flat=(arr)=>arr.toString().split(',').map(val=>parseInt(val))


// 5、apply方式
const flat=(arr)=>{
        while(arr.some(item => Array.isArray(item))){
            arr =  [].concat.apply([],arr);
        }
         return arr;
   }

let f = flat(muchArr)
console.log(f,'fff')
