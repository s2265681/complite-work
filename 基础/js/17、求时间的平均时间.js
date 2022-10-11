const arr = ["8:01", "9:30", "11:50"];

// 1、 转化时间成分钟， 得到平均时间后在转成 分钟
function average() {
  let minutes = 0;
  arr.forEach((o) => {
    let a = o.split(":");
    minutes = minutes + a[0] * 60 + parseInt(a[1]);
  });
  minutes = minutes / arr.length;
  console.log(minutes, "..");
  let hour = Math.floor(minutes / 60);
  let minute = minutes - 60 * hour;
  console.log(hour, "...", minute);
  return `${hour}:${minute}`;
}

// 2、 转化成时间戳， 平均后在转化

let res = 0;
function average() {
  arr.forEach((el) => {
    res += new Date("2000/01/01 " + el).getTime();
  });
  let a = new Date(res / arr.length);
  console.log(a, a.getHours(), a.getMinutes());
  return `${a.getHours()}:${a.getMinutes()}`;
}

average();
