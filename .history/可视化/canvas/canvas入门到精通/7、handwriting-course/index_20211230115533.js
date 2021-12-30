var clientWidth = 800;
var clientHeight = clientWidth;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clearDraw = document.querySelector(".clearDraw");
const colorList = document.querySelector(".colorList");

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

window.onload = function () {
  drawLine();
};

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
  //  e.preventDefault();
  const { clientX, clientY } = e.touches[0];
  console.log(clientX, clientY);
  drawStart({ clientX, clientY });
};
canvas.ontouchmove = function (e) {
  //  e.preventDefault();
  const { clientX, clientY } = e.touches[0];
  console.log(clientX, clientY);

  drawLine({ clientX, clientY });
};
canvas.ontouchend = function (e) {
  //  e.preventDefault();
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

// 开始绘画
function drawStart(point) {
  let { x, y } = windowToCanvas(point);
  lastPosition = { x, y };
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
    ctx.lineWidth = 30;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(curPosition.x, curPosition.y);
    ctx.stroke();
    lastPosition = curPosition;
  }
}

// 绘画后
function drawEnd() {
  isMouseDown = false;
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
