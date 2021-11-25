/**
 * throttle 节流
 * 原理 频繁点击中， 按指定时间触发，触发后清掉定时器， 有定时器 return
 */
function throttle(fn, delay = 500) {
  let timer = null;
  let _this = this;
  return function () {
    let args = arguments;
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(_this, args);
      timer = null;
    }, delay);
  };
}
