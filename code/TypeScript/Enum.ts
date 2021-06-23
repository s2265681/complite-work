
// 枚举 常量 ， 一般不会被改变

// enum Direction {
//     Up=0,
//     Down,
//     Left,
//     Right
// }

// console.log(Direction.Up)  // 0
// console.log(Direction[13])  // Down

 // 字符串枚举
const enum Direction { 
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

const value = 'UP'
if(value === Direction.Up){
    console.log('go up')
}