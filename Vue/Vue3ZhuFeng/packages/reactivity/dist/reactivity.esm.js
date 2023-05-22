// packages/shared/src/index.ts
var isObject = (value) => {
  return typeof value === "object" && value !== null;
};
var isArray = Array.isArray;

// packages/reactivity/src/reactive.ts
function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
    return target;
  }
  const handler = {
    // 监听属性访问操作
    get(target2, key, receiver) {
      if (key === "__v_isReactive" /* IS_REACTIVE */) {
        return true;
      }
      console.log(`${key}\u5C5E\u6027\u88AB\u8BBF\u95EE\uFF0C\u4F9D\u8D56\u6536\u96C6`);
      return Reflect.get(target2, key);
    },
    // 监听设置属性操作
    set(target2, key, value, receiver) {
      console.log(`${key}\u5C5E\u6027\u53D8\u5316\u4E86\uFF0C\u6D3E\u53D1\u66F4\u65B0`);
      if (target2[key] !== value) {
        const result = Reflect.set(target2, key, value, receiver);
        return result;
      }
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
export {
  reactive
};
//# sourceMappingURL=reactivity.esm.js.map
