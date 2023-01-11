export type rankDataKey = "creator" | "live" | "product" | "shop" | "video";

export type rankData = Record<
  rankDataKey,
  {
    status: number;
    items: [];
  }
>;

interface Obj {
  key: number;
}

type Readonly<T> = { readonly [P in keyof T]: T[P] };
type O1 = Readonly<Obj>;

type O2 = {
  readonly [P in keyof Obj]: Obj[P];
};

const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const arr = [];
// keyof typeof obj 获取obj对象中 所有key的联合类型
type keyType = keyof typeof obj; // "a" | "b" | "c"

interface iUserInfo {
  name: string;
  age: number;
}
// type keyType2 = keyof iUserInfo; // "a" | "b" | "c"
// const a: keyType2 = {
//     name:'1',
//     age:2
// }
// keyof in  限制一个类型必须是 另一个类型的子类型 或者 同类型
interface A {
  a: string;
}

// 类型继承 增加
interface B extends A {
  b: string;
}
const b: B = {
  a: "1",
  b: "1",
};

// type C = keyof in B; // "a" | "b"

function getValue<T extends Object, K extends keyof T>(o: T, key: K): T[K] {
  return o[key];
}

const obj1 = { name: "张三", age: 18 };
const a = getValue(obj1, "name");

type name = "firstName" | "lastName";
// 下面 key in 与 Record<key,value> 相同 都可以设置不同key下的 对象
type TName = {
  [key in name]: string;
};
type TName2 = Record<name, string>;

const tname: TName = {
  firstName: "",
  lastName: "",
};
const tname2: TName2 = {
  firstName: "",
  lastName: "",
};
