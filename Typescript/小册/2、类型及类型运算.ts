// 类型

// 元组 Tuple

type Tuple = [number, string];
const aa: Tuple = [1, "2"];

// 接口  Interface  可以描述函数 对象 构造器的结构
// 对象

interface Person {
  name: string;
  age: number;
}
class Person implements Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const p: Person = new Person("1", 2);
const a = p.age; // number

const obj2: Person = {
  name: "1",
  age: 2,
};

// 函数
interface Func {
  (name: string, age: number): void;
}
const func: Func = (name: string, age: number): void => {
  console.log(name, age);
};

// 构造器
interface PersonConstructor {
  new (name: string, age: number): Person;
}
function creatorPerson(ctor: PersonConstructor): Person {
  return new ctor("1", 2);
}

const person = creatorPerson(Person);
console.log(person);

// 索引类型
interface Iprops {
  [props: string]: string | number;
}
const o: Iprops = {
  name: "1",
  age: 2,
};
let o1 = o["name"];

// 枚举
enum Transpiler {
  Babel = "babel",
  Postcss = "postcss",
  Terser = "terser",
  Prettier = "prettier",
  TypeScriptCompiler = "tsc",
}

// 自面量类型
function color(value: `#${string}`) {
  console.log(value);
}
color("#f00");

// never 、void 、any、unkonwn

//! 条件 extends ? true : false
type res = 1 extends 2 ? true : false;

//! 推导 infer
type ITuple = [string, number];
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
  ? T
  : never;
type First2 = First<ITuple>; // First2:  string

//! 映射类型
type MapType<T> = {
  [Key in keyof T as `${Key & string}1`]?: T[Key] | number;
};

interface Name {
  name: string;
}
// 将 Name 的属性变为可选 通过as 重写key 重映射 更改 key
type O = MapType<Name>;

type OName = Partial<Name>;
