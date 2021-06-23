
// function add(x:number,y:number,z?:number):number{
//     console.log(typeof z)
//     if(typeof z ==='number'){
//         return x+y+z
//     }else{
//         return x+y
//     }
// }

// let p = add(1,2,3)
// console.log(p,'p')


// 函数 类型推断 add自动获取类函数的类型 
const add = function(x:number,y:number,z?:number):number{
        console.log(typeof z)
        if(typeof z ==='number'){
            return x+y+z
        }else{
            return x+y
        }
    }

const add2:(x:number,y:number,z?:number)=>number = add

const str = '1212'  // 类型推断 帮我们给没有明确声明类型的自动加一个类型
// str.replace()
// str = 1234  
