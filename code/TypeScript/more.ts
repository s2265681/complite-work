// 类型别名

// type aliases
type plusType = (x:number,y:number)=>number
function sum(x:number,y:number):number{
    return x+y
}
// const sum2:(x:number,y:number)=>number = sum
const sum2:plusType = sum

type NameResolver = () => string  // 函数类型 返回string
type NameOrResolver =  string | NameResolver  // 传入字符串或者函数
function getName(n:NameOrResolver):string{
    if(typeof n==='string'){
        return n
    }else{
        return n()
    }
}

// type assertion 类型断言  as 相当于多个类型判断分支
function getLength(input:string | number) : number{
    // const str = input as String;
    // if(str.length){
    //     return str.length
    // }else{
    //     const number = input as Number;
    //     return number.toString().length
    // }
    // =>
    if((<string>input).length){
        return(<string>input).length
    }else{
        return input.toString().length
    }
}


// 声明文件
jQuery('#f00')
// TypeSearch 中查找第三方库的声明文件
//地址： http://microsoft.github.io/TypeSearch/
// eg: npm install --save @types/jquery 安装jquery
// ok

