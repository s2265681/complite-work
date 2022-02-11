const a = require("../_webpack/手写webpack/product/src/a");

let tpl =
  "您好，我们公司是<% company.name %>, 我们部门是<% bu %>, ssss 我们部门是<% company.a.b %>";
let obj = {
  company: {
    name: "ali",
    a: {
      b: 1123456,
    },
  },
  bu: "事业部",
};

// 输出
// 您好，我们公司是ali, 我们部门事业部

function renderHTML(str, obj) {
  let reg = /<% (\S+) %>/g; // \s 是只空格 换行 \S 正好是剩下的
  //   let reg = /<% (\w+\.?\w+?) %>/g;
  return str.replace(reg, function (a, b, c) {
    //  return eval(`obj.${b}`)

    let r = JSON.parse(JSON.stringify(obj));
    let pp = b.split(".");
    do {
      let key = pp.shift();
      r = r[key];
    } while (pp.length > 0);
    return r;
  });
}

let o = renderHTML(tpl, obj);
console.log(o);
