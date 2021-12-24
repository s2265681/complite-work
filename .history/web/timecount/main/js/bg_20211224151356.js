/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-07 20:01:44
 */
import fillMoon from './moon.js'
// 通过createPattern作为背景使用 注意缓存起来 防止每次刷新
export default function createBackgroundCanvas(YIYAN) {
  var canvas = document.createElement("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var context = canvas.getContext("2d");
  // context.fillStyle = "#000";
  var gradientSty = context.createLinearGradient(0, 0, 0, canvas.height);
  gradientSty.addColorStop(1, "#035");
  gradientSty.addColorStop(0, "#000");

  // context.fillStyle = "#000";
  context.fillStyle = gradientSty;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.globalCompositeOperation = 'copy'

  // 画月亮 调用月亮的函数
  fillMoon(context, 2, canvas.width - 200, 130, 60, -30);
  // 画草地
  drawLand(context);

  function drawLand(ctx) {
    ctx.save();
    // ctx.translate(0, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.85);
    // ctx.bezierCurveTo(540, 400, 660, 800, 1200, 600); // 以800 1200 画不标准得倒的
    ctx.bezierCurveTo(
      canvas.width * 0.3,
      canvas.height * 0.85 * 0.85,
      canvas.width * 0.6,
      canvas.height * 0.85 * 1.3,
      canvas.width,
      canvas.height * 0.85
    );
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    var landStyle = ctx.createLinearGradient(0, 800, 0, 0);
    landStyle.addColorStop(0.0, "#030");
    landStyle.addColorStop(1.0, "#580");
    ctx.fillStyle = landStyle;
    ctx.fill();

    context.save();
    context.shadowColor = "yellow";
    // context.shadowOffsetX = 5;
    // context.shadowOffsetY = 5;
    context.shadowBlur = 3;
    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText(YIYAN, 40, canvas.height * 0.96);
    ctx.restore();
  }

  for (let i = 0; i < 200; i++) {
    let r = Math.random() * 10 + 5;
    let R = r * 0.5;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height * 0.8;
    drawStar(context, r, R, x, y, r);
  }

  // };

  // ctx r 小圆半径  大圆半径 偏移量 旋转角度
  function drawStar(ctx, r, R, x, y, rot = 0) {
    ctx.beginPath();
    // ctx.strokeStyle = "yellow";
    ctx.fillStyle = "rgba(255,200,0,0.6)";
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

  return canvas;
}
