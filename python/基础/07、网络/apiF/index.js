const Koa = require("koa");
const app = new Koa();

// post 请求
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

const cors = require("koa2-cors"); // 代替下面的解决跨域的方法
app.use(cors());

const list = require('./list')
app.use(list.routes());
// http://localhost:3001/list
app.listen(3001);
