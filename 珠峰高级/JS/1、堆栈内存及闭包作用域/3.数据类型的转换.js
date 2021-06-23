/* 
* 数据类型的转换4大核心标准

* 一、其他数据类型转化为Number的
*   1. 特定需要转换为Number的
*      + Number([val])
*      + parsetInt/parseFloat([val])
*   2. 隐式转化，浏览器内部先强制转为Number在进行计算饿
*      + isNaN([val])
*      + （加号放边上隐式转数字）作为数字运算，特殊情况是左右出现字符串，会拼接
*      + 在 == 比较的时候，有些值需要转换成数字再进行比较
        例子： 
        isNaN([]) // => Number([]) => isNaN(0)  => false
        isNaN({}) // => Number({}) => isNaN(NaN) => true
        isNaN('123') // => isNaN(123) => false 
        isNaN(true) === isNaN(false) // => false， false
        +[] // => Number([]) => 0
        =[] // => -0
        +{} // => Number({}) => NaN
        0+[] // '0'
        12 == '12' // => 12 == Number('12') => true


* 二、把其它数据类型转换为字符串
*     1. 能使用的方法
*        + toString() 
*        + String()
*     2. 隐式转换 （一般都是调用toString）
*        + (加号在中间，隐式转字符串)，加号做为运算符，如果一边出现字符串，则字符串拼接
*        + 把对象转换为数字，需要先toString()转换为字符串，再去转换为数字
*        + alert、confirm、prompt、document.write、typeof...这些都转字符串输出
    例子：
    + [] // => Number([]) => 0
    1 + []  // => 1 + [].toString() => 1+'' => '1'
    1 + {}  // => 1 + {}.toString() => 1 + '[object Object]' => '1[object Object]'
    注意：{} + 1 // 结果和 1+{} 不一样， 因为js会解析{}为代码块从而忽略。结果为 1 , ([])+222 结果才和上面的一样


* 三、把其它数据类型转换为布尔的
*    1. 转化为布尔
*       + !转为布尔值后取反
*       + !! 转为布尔值
*       + Boolean([val])
*    2. 隐式转换
*       + 在循环或者条件判断中，条件处理的结果就是布尔类型值
*       + ...
        * 规则： 只有‘0，undefined，null，undefined，空字符串，NaN’五个值在转化成布尔的时候为false，其他都是true
        ![]  // false
        !!{} // true
        !NaN // => !Boolean(NaN)  // true
        !!null // !!Boolean(null) // false
        !undefined // true
        !'' // true


* 四、在==比较中，数据转换的规则：
    【类型一样的几个特殊的点】
        {} == {} : false  
        [] == [] : false 
        NaN == NaN : false
     对象比较的是堆内存的地址，NaN不等于任何值包括他自己
    【类型不一样的转换规则】
        1、undefined == undefined => true 、 === => false
        2、字符串 == 对象 要把对象转换为字符串  
           '2222' == [2222] => '2222' == [2222].toString() => '2222' == '2222'
        3、 剩下如果==两遍数据类型不一致，都是需要转换成数字在进行比较
           0 == false  // => 0 == Number(false) => 0==0 // true
           0 == []     // true
           1 == ['1']  // true
        

总结加号： 
放在左右边上的时候，隐式转数字
    + '22222'  => 22222
    + []   =>  + Number([])  => 0
    + {}   =>  + Number({})  => NaN
    let a = '123'
    a++ =>  a为 124
    + false  => 0
    + true => 1
    + NaN => NaN
放在中间的时候，如果两边有一边有字符串那么就是字符串拼接
一边有对象，会先把对象转成字符串在拼接
    1 + '1'  // => '11'
    1 + []   // => 1 + '' => '1'
    1 + {}   // => 1 + "1[object Object]"
    {} + 1   // => 1  * 特殊
    ({}) + 1 // => '1'
    1 + new Date()  // => 1 +  new Date().toString() => "1Thu Jul 09 2020 13:45:44 GMT+0800 (中国标准时间)"
    1 + function(){} // => "1function(){}"
   
如果两侧至少一遍有布尔和null，没有字符串，那么会变为数字在相加
    1 + undefined  // => 1 + undefined => NaN
    1 + false      // 1
    true + 1       // 2
    NaN + 1212     // NaN 加任何数都是NaN，加字符串会拼接

    * null == undefined  // true
    * {} == {} false
    * [] == [] false
    * 对象根字符串比较转化为字符串
    * 对象和其他都转化为数字
    */


    // + parseInt、parseFloat
    // parseFloat比parseInt多小数
    // 先转化成字符串，然后从左到右查找有效数字，否则都为NaN
    // parseInt('2r'+'200')  // 2  
    // 2e+200
    // parseFloat有一个特例
    // parseFloat('2e'+200)
    // 2e+200
    // parseInt('left:200px') // NaN
    // parseFlot


    // 面试题
    // console.log([] == false) // true
    // 对象 == 布尔 都转化为数字(隐式)
    // 对象转为数字 先toString转化为字符串（先基于valueOf获得原始值，没有再去toString）
    // [].valueOf() // 不是原始值说明没有原始值
    // [].toString() // ''
    // '' => 0 => false
    // console.log(![] == false) // true
    // ![] 把数组转换为布尔类型然后在取反
    // 只有 0，undefined，false，0，undefined
    // false == false
    // => true
    /*  */

    // 把其他类型转换成字符串，toString(),一般都是直接单引号包起来，只有普通对象
    // {}.toString() 调取的是Object.prototype.toString()不是转换为字符串，而是检测数据类型，返回的是"[object Object]"

    // 把其他类型转换为数字，Number机制：
    console.log(Number(''))   // 0
    console.log(Number('10')) // 10
    console.log(Number('10px')) // NaN 只要出现非有效数字都是NaN
    console.log(Number(true)) // 1
    console.log(Number(false)) // 0
    console.log(Number(null)) // 0
    console.log(Number(undefined)) // NaN
    // console.log(Number(Symbol(10))) // 报错
    console.log(Number(BigInt(10)))  // 10
    // 把对象转化为数字， 先valueOf，没有原始值在toString变为字符串，然后字符串转为数字


    // parseInt机制，从左测第一个字符开始，查找有效数字字符，一旦遇到非有效数字，停止查找
    // 把找到的有效字符转化为数字，一个都没有返回NaN
    // 把转换的值先转化为字符串，
    // parseFloat 比parseInt 多识别一个小数点

    parseInt("") // NaN
    Number("") // 0
    isNaN("") // 隐士转换Number("") => 0 =>  false
    parseInt(null) // NaN
    Number(null) // 0
    isNaN(null)  // false
    parseInt("12px")  // 12
    Number('12px')  // NaN
    isNaN('12px')  // true

    parseFloat("1.6px") + parseInt("1.2px") + typeof parseInt(null)
    // 1.6 + 1 + 'number' => '2.6number' 加号左右两侧出现字符串都变为字符串拼接（有特殊），对象也可能拼接
    // 1 + []  应该是把对象转化为数字的，但是对象转数字，需要先转为字符串，则 + 遇到了字符串，直接变为了字符串拼接

    isNaN(Number(!!Number(parseInt("0.8"))))
    // parseInt("0.8") => 0
    // !!0 => false
    // Number(false) => 0
    // isNaN(0) => false

    typeof !parseInt(null) + !isNaN(null)
    // parseInt(null) => NaN
    // !NaN => true
    // typeof true  => boolean
    // isNaN(null) => !false => true
    // => "booleantrue"

    let result = 10 + false + undefined + [] + 'Tencent' + null + true + {};
    // + 遇到字符串和对象才拼接，否则都运算Number
    // 10 + false  => 10
    // 10 + undefined => 10 + Number(undefined) => 10 + NaN => NaN  // 任何数+NaN都是NaN
    // NaN + [] => "NaN"  // [] 变字符串为""
    // "NaN"+ "Tencent" => "NaNTencent"
    // ...都变了字符串拼接
    // "NaNTencentnulltrue[object Object]"

    // 特殊形，加号+ 即使一边出现字符串或者对象，也不一定是字符串拼接： ++/+ 这种情况是数组运算
    let n = "10"
    console.log(++n)  // 11
    console.log(+n)  // 10

    // {} + 0  // 0  左边的{} 理解为代码块，不参与运算
    // 0 + {}  // 这是数学运算 "0[object Object]"
    // ({})+0  // "[object Object]0" 参与到了数学运算当中

    // [].toString()  // ''
    // [12,12].toString()  // "12,12"
    // {}.toString()  // [object Object]
    // + {}   // NaN 
    // '2' + {}  // "2[object Object]"

    // 课后思考 阿里面试题
    let arr = [10,18,0,10,25,23]
    arr = arr.map(parseInt);
    console.log(arr)  // [10, NaN, 0, 3, 2, 13]
    // [23] == 23
    // let a = null
    // aa + ''  //  'aa'
    // aa++     // 0
    // + aa     // 0


