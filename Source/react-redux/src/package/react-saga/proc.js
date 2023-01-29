import { isPromise, isEffect } from "./utils";
import runEffect from "./runEffect";

/**
 * generator函数自执行器
 * @author lianxc
 * @param {object} {iterator} generator函数的迭代器
 * @param {object} {store} redux全局store
 * @return {oject} {result} 返回自执行完成最后得到的对象
 */
export default function proc(iterator, store) {
  next();
  function next(err, preValue) {
    let result;
    if (err) {
      result = iterator.throw(err);
    } else {
      result = iterator.next(preValue);
    }
    if (result.done) return result;

    if (isPromise(result.value)) {
      //yield promise
      let promise = result.value;
      promise
        .then((success) => next(null, success))
        .catch((err) => next(err, null));
    } else if (isEffect(result.value)) {
      //yield effect
      let effect = result.value;
      // console.log(runEffect)
      runEffect[effect.type](effect, next, store);
    } else {
      //yield others
      next(null, result.value);
    }
  }
}
