  Function.prototype.myCall = function (obj) {
    obj.fn = this;
    let params = [...arguments].slice(1)
    obj.fn(...params);
  };

  Function.prototype.myApply = function (obj) {
    obj.fn = this;
    let params = [...arguments].slice(1)
    obj.fn(...params[0]);
  };


let obj = { name: "123" };
let test = function (a,b) {
  console.log(this,a,b);
};
//   test();
test.myApply(obj,[1,2]);
