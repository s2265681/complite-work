// 大数相加，给两个字符串 "1234567" "7654321" , 返回字符串 "8888888"
function add(a, b) {
  let res = "",
    c = 0;
  a = a.split("");
  b = b.split("");
  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop();
    res = (c % 10) + res;
    c = c > 9;
  }
  return res;
}
