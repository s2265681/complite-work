var clientWidth = Math.min(document.body.clientWidth, 800);
var clientHeight = clientWidth;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clearDraw = document.querySelector(".clearDraw");
const colorList = document.querySelector(".colorList");

const controler = document.querySelector(".controler");
controler.style.width = clientWidth;

var drawColor = "#000";

canvas.width = clientWidth;
canvas.height = clientHeight;

var isMouseDown = false;

var lastPosition = {
  x: 0,
  y: 0,
};

var curPosition = {
  x: 0,
  y: 0,
};

var LastTimestamp = 0;

window.onload = function () {
  drawLine();
};

// 开始绘画
function drawStart(point) {
  let { x, y } = windowToCanvas(point);
  lastPosition = { x, y };
  LastTimestamp = new Date().getTime();
  isMouseDown = true;
}

// 绘画中
function drawIng(point) {
  if (isMouseDown) {
    // draw
    let { x, y } = windowToCanvas(point);
    curPosition = { x, y };
    ctx.beginPath();
    ctx.strokeStyle = drawColor;
    // 宽度 通过亮点的距离/时间 来决定
    var curTimestamp = new Date().getTime();
    var s = calcDistance(curPosition, lastPosition);
    var t = curTimestamp - LastTimestamp;
    var lineWidth = calclineWidth(t, s);
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(curPosition.x, curPosition.y);
    ctx.stroke();
    lastPosition = curPosition;
    LastTimestamp = curTimestamp;
  }
}

// 计算笔画的粗细
function calclineWidth(t, s) {
  var v = s / t;
  var resultLineWidth;
  if (v <= 0.1) resultLineWidth = 30;
  else if (v >= 10) resultLineWidth = 1;
  else resultLineWidth = 30 - ((v - 0.1) / (10 - 0.1)) * (30 - 1);
  return resultLineWidth;
}

// 判断亮点距离
function calcDistance(loc1, loc2) {
  return Math.sqrt(
    (loc1.x - loc2.x) * (loc1.x - loc2.x) -
      (loc1.y - loc2.y) * (loc1.y - loc2.y)
  );
}

// 绘画后
function drawEnd() {
  isMouseDown = false;
}

canvas.onmousedown = function (e) {
  e.preventDefault();
  const { clientX, clientY } = e;
  drawStart({ clientX, clientY });
};

canvas.onmouseup = function (e) {
  e.preventDefault();
  drawEnd();
};

canvas.onmousemove = function (e) {
  e.preventDefault();
  const { clientX, clientY } = e;
  drawIng({ clientX, clientY });
};

canvas.onmouseout = function (e) {
  e.preventDefault();
  drawEnd();
};

canvas.ontouchstart = function (e) {
  const { clientX, clientY } = e.touches[0];
  drawStart({ clientX, clientY });
};

canvas.ontouchmove = function (e) {
  const { clientX, clientY } = e.touches[0];
  drawIng({ clientX, clientY });
};

canvas.ontouchend = function (e) {
  drawEnd();
};

// 绘制线
function drawLine() {
  ctx.save();
  // 绘制外面大框
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#f00";
  ctx.moveTo(0, 0);
  ctx.lineTo(clientWidth, 0);
  ctx.lineTo(clientWidth, clientHeight);
  ctx.lineTo(0, clientHeight);
  ctx.closePath();
  ctx.stroke();
  // 绘制内部
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo(0, 0);
  ctx.lineTo(clientWidth, clientHeight);
  ctx.moveTo(clientWidth, 0);
  ctx.lineTo(0, clientHeight);
  ctx.moveTo(clientWidth / 2, 0);
  ctx.lineTo(clientHeight / 2, clientHeight);
  ctx.moveTo(0, clientHeight / 2);
  ctx.lineTo(clientWidth, clientHeight / 2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}
// windowToCanvas
function windowToCanvas(point) {
  var { left, top } = canvas.getBoundingClientRect();
  return {
    x: point.clientX - left,
    y: point.clientY - top,
  };
}

// 改变画笔颜色
colorList.addEventListener("click", function (e) {
  drawColor = e.target.id;
});

// 清除
clearDraw.addEventListener("click", function () {
  ctx.clearRect(0, 0, clientWidth, clientHeight);
  drawLine();
});
