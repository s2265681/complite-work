// 1、实现一个方法 factory，每次调用从数组里面随机取一个数，且不能与之前的数相同，直到取完为止（假设函数参数的数组值唯一不重复）

function factory(arr) {
  let array = arr || [];
  return function () {
    let i = Math.floor(Math.random() * array.length);
    let radomNum = array.splice(i, 1);
    console.log(radomNum[0]);
    return radomNum;
  };
}
// example:

const randomchoice = factory([1, 2, 3, 4, 5]);
randomchoice(); // 第1次调用返回 2
randomchoice(); // 第2次调用返回 5
randomchoice(); // 第3次调用返回 3
randomchoice(); // 第4次调用返回 1
randomchoice(); // 第5次调用返回 4
// randomchoice(); 

// const randomchoice1 = factory([6, 7, 8]);
// randomchoice1(); // 第1次调用返回 7
// randomchoice1(); // 第2次调用返回 6
// randomchoice1(); // 第3次调用返回 8
