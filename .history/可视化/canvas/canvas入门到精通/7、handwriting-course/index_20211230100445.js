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
  ctx.fillStyle = "red";
  ctx.moveTo(0, 0);
  ctx.lineTo(clientWidth, 0);
  ctx.lineTo(clientWidth, clientHeight);
  ctx.lineTo(0, clientHeight);
  ctx.closePath();
  ctx.restore();
}
