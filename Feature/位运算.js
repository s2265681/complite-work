// React Lane
// 二进制位  0b开头表示二进制数
// 存储空间小， 传输数据量小
const READ = 0b1; // 0001 => 1
const CREATE = 0b10; // 00010 => 2
const UPDATE = 0b100; // 000100 => 4
const DELETE = 0b1000; // 0001000 => 8
const READ_AND_UPDATE = 0b1111;

// 1) 按位或（OR）｜ 或 新权限定义(有一个1就为1) 对于每一个比特位，当两个操作数相应的比特位至少有一个 1 时，结果为 1，否则为 0。
const READ_CREATE_UPDATE = READ | CREATE | UPDATE;
console.log(READ_CREATE_UPDATE);
// log(READ_CREATE_UPDATE);

const UPDATE_DELETE = UPDATE | DELETE;
// log(UPDATE_DELETE);

// 2). 按位与（AND） & 计算判断有无权限(两个都是1才为1) 对于每一个比特位，只有两个操作数相应的比特位都是 1 时，结果才为 1，否则为 0。
const UPDATE_DELETE_READ = UPDATE_DELETE & READ;
// log(UPDATE_DELETE_READ);

console.log((UPDATE_DELETE & READ) === READ, ";;;");

// 通过抑或 切换权限 配合 查询 （不同返回1，相同返回0）
// log(READ_CREATE_UPDATE & READ);
const CREATE_UPDATE = READ_CREATE_UPDATE ^ READ;
// log(CREATE_UPDATE & READ);

// 3). 按位异或 （XOR） a ^ b 对于每一个比特位，当两个操作数相应的比特位有且只有一个 1 时，结果为 1，否则为 0。

if (!(CREATE_UPDATE & DELETE)) {
  let CREATE_UPDATE_DELETE = CREATE_UPDATE ^ DELETE;
  log(CREATE_UPDATE_DELETE);
  log(CREATE_UPDATE_DELETE & DELETE);
  CREATE_UPDATE_DELETE = CREATE_UPDATE_DELETE ^ DELETE;
  log(CREATE_UPDATE_DELETE);
  log(CREATE_UPDATE_DELETE & DELETE);
}

// 4). 按位非 （NOT） \  ~a 反转操作数的比特位，即 0 变成 1，1 变成 0。
let a = 0b110;
b = ~a.toString(2); // output: -111
log(b);

const A8 = 0o122;

const A16 = 0x32323;

const A16A = 0xb;

// 5) 左移（Left shift） 将 a 的二进制形式向左移 b (< 32) 比特位，右边用 0 填充。

let aa = 0b110,
  bb = 0b100;
// (aa << b).toString(2)            // output: "1100000"
// (0b1 << 0b11).toString(2)       // outout: "1000"
// (0b1 << 0b111).toString(2)      // output: "10000000"
// (0b1 << 0b1111).toString(2)     // output: "1000000000000000"

log(0b1);
// log(0b110 << 0b100);

// 7) 无符号右移  a >>> b

function log(val) {
  console.log("2进制:", val.toString(2), "10进制：", val.toString(10));
}

// 那么如果单纯的想删除权限（而不是无则增，有则减）怎么办呢？
// 答案是执行 &(~code)，先取反，再执行与操作

log(READ_CREATE_UPDATE & ~UPDATE & READ);
console.log(READ_AND_UPDATE, "READ_AND_UPDATE");
