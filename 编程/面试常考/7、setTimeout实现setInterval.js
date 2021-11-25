// let a = setInterval(() => {
//   console.log("11111");
// }, 1000);

function mockSetInterVal(fn, delay) {
  let timer = null;
  const interval = () => {
    fn();
    timer = setTimeout(interval, delay);
  };
  setTimeout(interval, delay);
  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}

let { cancel } = mockSetInterVal(() => console.log("mock setInterval"), 1000);

setTimeout(() => {
  // clearInterval(a);
  cancel();
}, 4000);
