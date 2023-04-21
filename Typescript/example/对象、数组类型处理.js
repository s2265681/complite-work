const obj = {
    a: 1,
    b: 2,
    c: 3,
};
const arr = [];
const b = {
    a: "1",
    b: "1",
};
// type C = keyof in B; // "a" | "b"
function getValue(o, key) {
    return o[key];
}
const obj1 = { name: "张三", age: 18 };
const a = getValue(obj1, "name");
const tname = {
    firstName: "",
    lastName: "",
};
const tname2 = {
    firstName: "",
    lastName: "",
};
let person = { name: "tao", age: 18 };
export {};
