// 例子
function getUser() {
  return fetch("./data.json");
}

async function test() {
  const user = await getUser();
  return user;
}

async function main() {
  const res = await test();
  console.log(res, "res");
}

// main();

// 改写例子

function test2() {
  const user = getUser();
  return user;
}

function main2() {
  const res = test2();
  console.log(res, "res222");
  return res;
}

//--------------//
// 消除异步的思路就是去掉async 和 await
// 重写一个新的 fetch函数， 内部用 cache 缓存一下， 一旦有了就直接返回了
// react 的 Susponse 组件就是这样的原理 劫持 promise 的状态 执行两遍

function run(fun) {
  // 重写fetch
  const oldFetch = window.fetch;
  let cache = {
    value: null,
    status: "pedding",
  };
  const newFetch = function (...args) {
    if (cache.status === "fulfilled") {
      return cache.value;
    } else if (cache.status === "rejected") {
      throw cache.value;
    }
    console.log(oldFetch, args, "oldFetch");
    let p = oldFetch(...args)
      .then((res) => res.json())
      .then((res) => {
        console.log("res,");
        cache.value = res;
        cache.status = "fulfilled";
      })
      .catch((err) => {
        console.log("res,");
        console.log(err, "rrrr");
        cache.value = err;
        cache.status = "rejected";
      });
    // 抛出promise
    throw p;
  };
  // 先用新的fetch
  window.fetch = newFetch;
  // 执行 fun函数
  try {
    fun();
  } catch (error) {
    if (error instanceof Promise) {
      error.finally((res) => {
        window.fetch = newFetch;
        fun();
        window.fetch = oldFetch;
      });
    }
  }
  // 恢复fetch
  window.fetch = oldFetch;
}

run(main2);
