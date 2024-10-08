export let activeEffect;

// 初始化时执行一次， 并保存下来
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

class ReactiveEffect {
  fn: any;
  constructor(fn) {
    this.fn = fn;
  }
  run() {
    // 将 _effect 赋给全局的变量 activeEffect
    activeEffect = this;
    // fn执行时，内部用到的响应式数据的属性会被访问到，就能触发 proxy 对象的 get 取值操作
    this.fn();
  }
}

// 依赖收集
// 存储所有的依赖信息，包含 target、key 和 _effect
const targetMap = new WeakMap();
/**
 * 依赖收集。关联对象、属性和 _effect。
 */
export function track(target, key) {
  if (!activeEffect) return; // 从缓存中找到 target 对象所有的依赖信息

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  } // 再找到属性 key 所对应的 _effect集合
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  } // 如果 _effect 已经被收集过了，则不再收集
  let shouldTrack = !deps.has(activeEffect);
  if (shouldTrack) {
    deps.add(activeEffect);
  }
}

export function trigger(target, key) {
  // 从缓存中找到 target 对象所有的依赖信息
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  // 再找到属性 key 所对应的 _effect集合
  const effects = depsMap.get(key);
  if (!effects) return;
  // 如果 _effect 已经被收集过了，则不再收集
  effects.forEach((effect) => {
    console.log(effect.run, "fn");
    effect.run();
  });
}
