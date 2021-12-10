// 出现原因是给每个按钮加事件，但是执行时，因为i是全局的，i已经执行结束 i为最后一个buttons值，所以点击找不到对应i
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      draw(this.text);
      console.log(i); // i 打印的是最后一个buttons的值 
      return false;
    };
}

// 法一 通过闭包形式，里面自执行生成i个函数作用域，每个作用域都有各自的i，点击每个i对应的事件就可以打印对应的i
for (var i = 0; i < buttons.length; i++) {
  (function (j) {
    buttons[i].onclick = function () {
      draw(this.text);
      console.log(j);
      return false;
    };
  })(i);
}

// 法二 let 会形成块级作用域 可以找出相应的i
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    draw(this.text);
    console.log(j);
    return false;
  };
}

// 法三 每次循环将当前i提前加到buttons的index上面， 点击当前的按钮时，会从当前按钮上找index，这是最好的方式
for (let i = 0; i < buttons.length; i++) {
  buttons[i].index = i;
  buttons[i].onclick = function () {
    draw(this.text);
    console.log(this.index);
    return false;
  };
}
