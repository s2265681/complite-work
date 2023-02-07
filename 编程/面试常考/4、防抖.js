// 主要原理： 频繁点击清理定时器 执行最后一次
function debounce(fn, delay = 500) {
  let timer = null;
  let _this = this;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    let args = arguments;
    timer = setTimeout(() => {
      fn.apply(_this, args);
      timer = null;
    }, delay);
  };
}
