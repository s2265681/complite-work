var VueReactivity = (() => {
  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };
  var isArray = Array.isArray;

  // packages/reactivity/src/index.ts
  var obj = { name: "Vue3" };
  console.log(isObject(obj));
})();
//# sourceMappingURL=reactivity.global.js.map
