let a = 0,
  b = 0;
function fn(a) {
  fn = function fn2(b) {
    alert(++a + b);
  };
  alert(a++);
}
fn(1);
fn(2);

// 1、 5

async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 success");
  return "async end";
}
console.log("script start");
async1().then((res) => console.log(res));
console.log("script end");

// script start  => async1 start => promise1 => async1 success => async end => script end

// 实现 add 方法
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

// 限制同一时刻只能执行2个task
addTask(4000, "1");
addTask(3500, "2");
addTask(4000, "3");
addTask(3000, "4");

// Scheduler ?
// 4s 后打印1
// 3.5s 后打印2
// 4s 后打印3
// 3s后打印4
