/**
 * 十进制转化为二进制
 * 35 => 35/2 ..  100011
 */
function toTwoNum(num){
   let stack = []
   while(num >= 2){
       console.log(num % 2,'num')
       num = Math.floor(num/2)
       stack.push(num % 2)
   }
   stack.push(1)
   return  stack.join('')
}

console.log(toTwoNum(35))