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
  e.preventDefault();
  console.log("onmousedown");
  let { x, y } = windowToCanvas({
    x: e.clientX,
    y: e.clientY,
  });
  console.log(x, y);
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
  }
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

// windowToCanvas
function windowToCanvas(point) {
  var { left, top, width, height } = canvas.getBoundingClientRect();
  return {
    x: point.x - left,
    y: point.y - top,
  };
}
