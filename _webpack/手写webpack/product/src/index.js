const str = require('./a.js');
const c = require('./c.js');
require('./index.less');
console.log(str,c);


// class ZF{
//     constructor(){
//         this.name = 'sssss'
//     }
//     getName(){
//         return this.name
//     }
// }

// let zf = new ZF()
// console.log(zf.getName())

let button = document.createElement("button");
button.innerHTML = "按钮";
button.addEventListener("click", function () {
    // debugger
  import("./hello").then((result) => {
    console.log(result.default);
  });
});

console.log("index");
document.body.appendChild(button)