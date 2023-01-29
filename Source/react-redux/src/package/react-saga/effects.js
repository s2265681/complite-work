/**
 * take effect生成函数
 * @author lianxc
 * @param {string} {signal} 监听的action类型
 * @return {oject} {effect} 普通js对象，描述该effect的类型、监听action类型等信息
 */
export function take(signal) {
  return {
    isEffect: true,
    type: "take",
    signal,
  };
}

export function call(fn, ...args) {
  return {
    isEffect: true,
    type: "call",
    fn,
    args,
  };
}

/**
 * put effect生成函数
 * @author lianxc
 * @param {object} {action} 即将触发的action
 * @return {oject} {effect} 普通js对象，描述该effect的类型、携带的action等信息
 */
export function put(action) {
  return {
    isEffect: true,
    type: "put",
    action,
  };
}

/**
 * takeEvery effect生成函数
 * @author lianxc
 * @param {string} {signal} 监听的action类型
 * @param {generator} {saga} 监听到对应action后，派生的saga函数
 * @return {oject} {effect} 普通js对象，描述该effect的类型、派生的Saga任务等信息
 */
export function takeEvery(signal, saga) {
  return {
    isEffect: true,
    type: "takeEvery",
    signal,
    saga,
  };
}

/**
 * fork effect生成函数
 * @author lianxc
 * @param {generator} {saga} 后台独立创建一个新的task执行saga，不阻塞当前saga的执行
 * @param {object} {args} 其他附带参数
 * @return {oject} {effect} 普通js对象，描述该effect的类型、启动的Saga任务等信息
 */
export function fork(saga, ...args) {
  return {
    isEffect: true,
    type: "fork",
    saga,
    args,
  };
}

/**
 * all effect生成函数
 * @author lianxc
 * @param {generator} {saga} 后台独立创建一个新的task执行saga，不阻塞当前saga的执行
 * @param {object} {args} 其他附带参数
 * @return {oject} {effect} 普通js对象，描述该effect的类型、启动的Saga任务等信息
 */
export function all(taskArrs) {
  return {
    isEffect: true,
    type: "all",
    taskArrs,
  };
}
