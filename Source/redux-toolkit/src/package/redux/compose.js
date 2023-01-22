function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

//  洋葱圈模型
// let a =
//   (next) =>
//   (...args) => {
//     console.log("a1 start", next);
//     next(...args);
//     console.log("a1 end");
//   };

// let b =
//   (next) =>
//   (...args) => {
//     console.log("a2 start", next);
//     next(...args);
//     console.log("a2 end");
//   };

// const c1 = compose(a, b);
// console.log(c1);
// const c2 = c1(console.log);
// console.log(c2);
// c2("----");
export default compose;
