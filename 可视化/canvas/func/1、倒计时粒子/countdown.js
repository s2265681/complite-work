/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-05 19:59:38
 */

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 60;

var endTime = new Date(2021, 11, 06, 18, 47, 52);
var curShowTimeSeconds = 0;

// 初始化
window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurShowTimeSeconds();

  setInterval(()=>{
    render(context);
    update()
  },50)
};

// 更新当前curShowTimeSeconds
function update(){
    
}

// 计算当前倒计时的差值的秒数
function getCurShowTimeSeconds() {
  var curTime = new Date();
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret / 1000);
  return ret >= 0 ? ret : 0;
}

// 渲染时分秒
function render(ctx) {
  ctx.clearReact(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
  var seconds = curShowTimeSeconds % 60;

  console.log(hours, minutes, seconds);

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
  renderDigit(
    MARGIN_LEFT + 15 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(hours % 10),
    ctx
  );
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

  renderDigit(
    MARGIN_LEFT + 39 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(minutes / 10),
    ctx
  );
  renderDigit(
    MARGIN_LEFT + 54 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(minutes % 10),
    ctx
  );
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

  renderDigit(
    MARGIN_LEFT + 78 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(seconds / 10),
    ctx
  );
  renderDigit(
    MARGIN_LEFT + 93 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(seconds % 10),
    ctx
  );
}

// 渲染数字小球
function renderDigit(x, y, num, ctx) {
  ctx.fillStyle = "rgb(0,102,153";
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        ctx.beginPath();
        ctx.arc(
          x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          RADIUS,
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}
