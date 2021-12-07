/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-07 20:01:44
 */
// window.onload = function () {
var canvas = document.getElementById("c");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var context = canvas.getContext("2d");
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < 200; i++) {
  let r = Math.random() * 10 + 10;
  let R = r * 0.5;
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  drawStar(context, r, R, x, y, r);
}
// };

// ctx r 小圆半径  大圆半径 偏移量 旋转角度
function drawStar(ctx, r, R, x, y, rot = 0) {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.fillStyle = "orange";
  for (var i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72 - rot) / 180) * Math.PI) * R + x,
      -Math.sin(((18 + i * 72 - rot) / 180) * Math.PI) * R + y
    );
    ctx.lineTo(
      Math.cos(((54 + i * 72 - rot) / 180) * Math.PI) * r + x,
      -Math.sin(((54 + i * 72 - rot) / 180) * Math.PI) * r + y
    );
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
