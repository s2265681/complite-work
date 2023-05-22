import { isObject } from "@my-vue/shared";
import { track, trigger } from "./effect";
// 1. 代理对象 代理一次就可以了
// 2. 代理对象中的某个属性再次被代理，会造成性能问题

// 缓存响应式对象
// const reactiveMap = new WeakMap();
const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}
export function reactive(target) {
  // 只能代理对象
  if (!isObject(target)) {
    return target;
  }

  // 判断 target 是否被代理过。如果被代理过，则直接返回代理对象
  // const existing = reactiveMap.get(target);
  // if (existing) {
  //   return existing;
  // }
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }

  const handler = {
    // 监听属性访问操作
    get(target, key, receiver) {
      // 访问到 __v_isReactive 属性时，说明此时的 target 其实是一个 proxy 对象，无需再被代理
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
      }
      // 依赖收集，让 target, key 和 当前的 _effect 关联起来
      track(target, key);
      const res = Reflect.get(target, key);
      if (isObject(res)) {
        return reactive(res);
      }
      return res;
    }, // 监听设置属性操作
    set(target, key, value, receiver) {
      console.log(`${key}属性变化了，派发更新`); // 当属性的新值和旧值不同时，再进行设置
      if (target[key] !== value) {
        const result = Reflect.set(target, key, value, receiver);
        // 派发更新，通知 target 的属性，让依赖它的 _effect 再次执行
        trigger(target, key);
        return result;
      }
    },
  }; // 实例化代理对象
  const proxy = new Proxy(target, handler);

  // 将代理对象进行缓存
  // reactiveMap.set(target, proxy);
  return proxy;
}
