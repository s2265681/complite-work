// 跟 lodash 实现
// 添加类型
// 例子 约束传入参数的类型， 知道返回值的类型，
// var object = { 'a': 1, 'b': '2', 'c': 3 };
// _.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }

// function pick<T extends Record<string, unknown>, U extends keyof T>(
//   target: T,
//   keys: U[]
// ): {
//   [K in U]: T[U];
// };

function pick<T extends object, U extends keyof T>(
  object: T,
  keys: readonly U[]
): Pick<T, U>;

// function pick(target, keys?) {
//   let result = {};
//   Object.keys(target).map((el) => {
//     if (keys?.includes(el)) {
//       result[el] = target[el];
//     }
//   });
//   return result;
// }

// var pickObj = pick({ a: "1", b: "2", c: 3 }, ["a", "c"]);
// var A = pickObj.a;

function pick<T extends object, U extends keyof T>(
  target: T,
  keys: U[]
): {
  [P in U]: T[U];
};

function pick(target = {}, keys) {
  let result = {};
  Object.keys(target).map((el) => {
    if (keys.includes(el)) {
      result[el] = target[el];
    }
  });
  return result;
}

const result = pick({ a: "1", b: "2", c: 3 }, ["a"]);

const resultA = result.a;

type Pickk<T, U extends keyof T> = {
  [P in U]: T[P];
};

type a = {
  a: number;
  b: string;
};

type p = Pickk<a, "a">;
