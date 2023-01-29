import channel from "./channel";
import proc from "./proc";
import { take, fork } from "./effects";
import { isPromise, isEffect } from "./utils";

/**
 * put effect执行函数
 * @author lianxc
 * @param {object} {action} put带的action对象
 * @param {oject} {next} put所在的generator的自动执行函数
 * @param {oject} {store} redux的store对象
 */
function runPut({ action }, next, store) {
  const { dispatch } = store;
  dispatch(action);
  next();
}

/**
 * fork effect执行函数
 * @author lianxc
 * @param {object} {saga} 非阻塞调用的saga
 * @param {oject} {store} redux的store对象
 */
function runFork({ saga }, next, store) {
  let iterator = saga();
  proc(iterator, store);
  next();
}

/**
 * take effect执行函数
 * @author lianxc
 * @param {object} {signal} 监听的action类型
 * @param {oject} {next} take所在的generator的自动执行函数
 * @param {oject} {store} redux的store对象
 */
function runTake({ signal }, next, store) {
  channel.take({
    signal,
    callback: (args) => {
      next(null, args);
    },
  });
}

/**
 * takeEvery effect执行函数
 * @author lianxc
 * @param {object} {action} put带的action对象
 * @param {oject} {next} put所在的generator的自动执行函数
 * @param {oject} {store} redux的store对象
 */
function runTakeEvery({ signal, saga, ...args }, next, store) {
  function* takeEveryGenerator() {
    while (true) {
      yield take(signal);
      yield fork(saga);
    }
  }
  runFork({ saga: takeEveryGenerator }, next, store);
}

/**
 * call effect执行函数
 * @author lianxc
 * @param {function} {fn} 阻塞调用的任务
 * @param {oject} {store} redux的store对象
 */
function runCall({ fn, args }, next, store) {
  fn(args)
    .then((success) => {
      next(null, success);
    })
    .catch((err) => {
      next(err, null);
    });
}

/**
 * all effect执行函数
 * @author lianxc
 * @param {array} {taskArrs} 并发任务
 * @param {oject} {store} redux的store对象
 */
function runAll({ taskArrs }, next, store) {
  taskArrs.forEach((task) => {
    if (typeof task.next === "function") {
      proc(task, store);
    } else if (isEffect(task)) {
    }
  });
}

export default {
  take: runTake,
  put: runPut,
  takeEvery: runTakeEvery,
  fork: runFork,
  call: runCall,
  all: runAll,
};
