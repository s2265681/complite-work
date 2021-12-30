var clientWidth = 800;
var clientHeight = clientWidth;

canvas.width = clientWidth;
canvas.height = clientHeight;

var isMouseDown = false;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  drawLine(ctx);
};

canvas.onmousedown = function (e) {
  console.log("onmousedown");
  isMouseDown = true;
  e.preventDefault();
};

canvas.onmouseup = function (e) {
  console.log("onmouseup");
  isMouseDown = false;
  e.preventDefault();
};

canvas.onmouseover = function (e) {
  if (isMouseDown) {
    // draw
    console.log("draw");
  }
  e.preventDefault();
};

canvas.onmouseout = function (e) {
  console.log("onmouseout");
  isMouseDown = false;
  e.preventDefault();
};

// 画笔

// 绘制线
function drawLine(ctx) {
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
