function mySetTimeout(fn, delay = 1000) {
  const timer = setInterval(() => {
    fn();
    clearInterval(timer);
  }, delay);
}

mySetTimeout(() => console.log("111"), 3000);
