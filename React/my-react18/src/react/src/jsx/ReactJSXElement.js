const RESEVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};
function hasVaildKey(config) {
  return config.key !== undefined;
}

function hasVaildRef(config) {
  return config.ref !== undefined;
}

function ReactElement(type, key, ref, props) {
  return {
    $$type: Symbol.from("react.element"),
    key,
    ref,
    props,
  };
}
export function jsxDEV(type, config) {
  debugger;
  let propsName; // 属性名
  const props = {}; // 属性对象
  let key = null; // 每个虚拟DOM可以有一个可选的key属性，用来区分一个父节点下的不同子节点
  let ref = null; // 引入，后面可以通过这个实现获取真实DOM的需求

  if (hasVaildKey(config)) {
    key = config.key;
  }

  if (hasVaildRef(config)) {
    ref = config.ref;
  }

  for (propsName in config) {
    if (
      Object.prototype.hasOwnProperty.call(config, propsName) &&
      !RESEVED_PROPS.hasOwnProperty(propsName)
    ) {
      props[propsName] = config[propsName];
    }
  }

  return ReactElement(type, key, ref, props);
}
