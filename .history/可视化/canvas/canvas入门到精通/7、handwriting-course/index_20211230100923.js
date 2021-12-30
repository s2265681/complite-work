var clientWidth = 800;
var clientHeight = clientWidth;

canvas.width = clientWidth;
canvas.height = clientHeight;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  drawLine(ctx);
};

// 绘制线
function drawLine(ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#f00";
  ctx.moveTo(0, 0);
  ctx.lineTo(clientWidth, 0);
  ctx.lineTo(clientWidth, clientHeight);
  ctx.lineTo(0, clientHeight);

  ctx.lineWidth = 3;
  ctx.moveTo(0, 0);
  ctx.lineTo(clientWidth, clientHeight);
  ctx.moveTo(clientWidth, 0);
  ctx.lineTo(0, clientHeight);
  ctx.moveTo(clientWidth / 2, 0);
  ctx.lineTo(clientHeight / 2, clientHeight);
  ctx.moveTo(0, clientHeight / 2);
  ctx.lineTo(0, clientHeight / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
