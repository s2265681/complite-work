var clientWidth = 800;
var clientHeight = clientWidth;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clearDraw = document.querySelector(".clearDraw");
const colorList = document.querySelector(".colorList");

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
  let clientX = e.clientX;
  let clientY = e.clientY;
  let { x, y } = windowToCanvas({ clientX, clientY });
  lastPosition = { x, y };
  isMouseDown = true;
};

canvas.onmouseup = function (e) {
  e.preventDefault();
  console.log("onmouseup");
  isMouseDown = false;
};

canvas.onmousemove = function (e) {
  e.preventDefault();
  if (isMouseDown) {
    // draw
    let clientX = e.clientX;
    let clientY = e.clientY;
    let { x, y } = windowToCanvas({ clientX, clientY });
    curPosition = { x, y };
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 30;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(curPosition.x, curPosition.y);
    ctx.stroke();
    lastPosition = curPosition;
  }
};

canvas.onmouseout = function (e) {
  console.log("onmouseout");
  isMouseDown = false;
  e.preventDefault();
};

// 画笔

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

colorList.addEventListener("click", function (e) {
  console.log(e.key, "eee");
});
