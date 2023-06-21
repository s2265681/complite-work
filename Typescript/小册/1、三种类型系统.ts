// 1、简单类型系统
// 这是最基础的类型系统，能保证类型安全，但有些死板
function add(x: string | number, y: string | number): string | number {
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  }
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }
  return "error";
}

// 2、支持泛型的类型系统
// 泛型的英文是 Generic Type，通用的类型，它可以代表任何一种类型，也叫做类型参数。

function add1<T extends string | number>(x: T, y): T {
  return x + y;
}

// 3、类型编程的类型系统
// 对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程。下面是例子

function getPropValue<T>(obj: T, key: string) {
  return obj[key];
}

// 上面增加了泛型后，还是无法知道内部属性和值， 需要对传入的参数T做进一步的逻辑运算， 产生新的类型， 这就是类型编程
function getPropValue2<T extends object, Key extends keyof T>(
  obj: T,
  key: Key
) {
  return obj[key];
}

const o = {
  name: "lison",
  age: 18,
};

const keyO = getPropValue2(o, "name");
const keyO2 = getPropValue2(o, "age");

// keyO 为string
// keyO2 为number
