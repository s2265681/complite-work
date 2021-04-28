const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String
});
const model = mongoose.model("member", schema);

// 测试数据
// async function testdata() {
//   await model.deleteMany();
//   await model.insertMany([
//     {
//       name: ""
//     }
//   ]);
// }
// testdata();
module.exports = model;
