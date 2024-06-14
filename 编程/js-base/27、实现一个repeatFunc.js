// 实现一个repeat 要求如下
const repeat = (func, times, wait) => {
  return (str) => {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        func(str);
      }, i * wait);
    }
  };
};

const repeatFunc = repeat(console.log, 4, 3000); // 会输出4次hello, 每次间隔3秒4

repeatFunc("hello");
