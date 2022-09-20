// https://blog.csdn.net/c_kite/article/details/80261544
// es3 继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.say = "hi";

function Child(name) {
  Parent.call(this, name);
}

// es5继承  Object.create()

// es6 继承 ClassB.prototype.__proto__ = ClassA.prototype
