
const STATUS_TODO = "STATUS_TODO";
const STATUS_DOING = "STATUS_DOING";
const STATUS_DONE = "STATUS_DONE";

export const STATUS_CODE:any={
  STATUS_TODO:"待处理",
  STATUS_DOING:"进行中",
  STATUS_DONE:"已完成"
}

export let tasks = [{
  id:1,
  status:STATUS_TODO,
  title:'每次阅读五次，每次阅读完、要做100字的读书笔记',
  username:'小夏',
  point:7
},{
  id:2,
  status:STATUS_TODO,
  title:'每次健身4次，每次健身时间需要大于30分钟',
  username:'橘子🍊',
  point:4
},{
  id:3,
  status:STATUS_TODO,
  title:'单词*100',
  username:'小王妃',
  point:1
},{
  id:4,
  status:STATUS_TODO,
  title:'单词*130',
  username:'小王妃',
  point:4
},{
  id:5,
  status:STATUS_TODO,
  title:'单词*150',
  username:'小王妃',
  point:2
}]
