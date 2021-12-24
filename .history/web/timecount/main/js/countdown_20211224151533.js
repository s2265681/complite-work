/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-05 19:59:38
 */
import createBackgroundCanvas from './bg.js'
import digit from './digit.js'

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 60;
// var endTime = new Date(2021, 11, 07, 18, 47, 52);
var curShowTimeSeconds = 0;

var balls = [];
var pattern = null
// var ball = { x: 500, y:100, r: 20, vy: -4, vx: -4, g: 2 }
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000",
];

var time = 0;

// 初始化 倒计时
export default function countDownInit(){
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;

  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  RADIUS = Math.round((WINDOW_WIDTH * 4) / 5 / 108) - 1;
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  curShowTimeSeconds = getCurShowTimeSeconds();


  setInterval(() => {
    render(context);
    update();
    // ball.x += ball.vx;
    // ball.y += ball.vy;
    // ball.vy += ball.g;
    // renderBall(context);
  }, 50);
  // requestAnimationFrame 替代 setInterval
  // window.requestAnimationFrame(() => updateRender(context));
};

// function updateRender(context) {
//   window.requestAnimationFrame(() => updateRender(context));
//   time++;
//   if (time >= 3.5) {
//     render(context);
//     update();
//     time = 0;
//   }
// }

// 更新当前curShowTimeSeconds 和 小球渲染
function update() {
  var nextShowTimeSeconds = getCurShowTimeSeconds();

  var nextHours = parseInt(nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
  var nextSeconds = nextShowTimeSeconds % 60;

  var curHours = parseInt(curShowTimeSeconds / 3600);
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
  var curSeconds = curShowTimeSeconds % 60;

  if (nextSeconds !== curSeconds) {
    // 时间变更，添加小球
    if (parseInt(curHours / 10) !== parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
      addBalls(
        MARGIN_LEFT + 15 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curHours % 10)
      );
    }
    if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
      addBalls(
        MARGIN_LEFT + 39 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curMinutes / 10)
      );
    }
    if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
      addBalls(
        MARGIN_LEFT + 54 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curMinutes % 10)
      );
    }
    if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
      addBalls(
        MARGIN_LEFT + 78 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curSeconds / 10)
      );
    }
    if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
      addBalls(
        MARGIN_LEFT + 93 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(curSeconds % 10)
      );
    }
    curShowTimeSeconds = nextShowTimeSeconds;
  }
  // 对所有小球进行更新便利
  updateBalls();
}

// 计算当前倒计时的差值的秒数
function getCurShowTimeSeconds() {
  // 倒计时
  // var curTime = new Date();
  // var ret = endTime.getTime() - curTime.getTime();
  // ret = Math.round(ret / 1000);
  // return ret >= 0 ? ret : 0;

  // 时钟
  var curTime = new Date();
  var ret =
    curTime.getHours() * 3600 +
    curTime.getMinutes() * 60 +
    curTime.getSeconds();
  return ret >= 0 ? ret : 0;
}

// 更新小球的位置关系
function updateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.45;
    }
    // 右侧墙壁的碰撞
    // if (balls[i].x >= WINDOW_WIDTH - RADIUS) {
    //   balls[i].x = WINDOW_WIDTH - RADIUS;
    //   balls[i].vx = -balls[i].vx
    // }
    // 左侧碰撞后
    // if (balls[i].x <= 0 + RADIUS / 2) {
    //   balls[i].x = 0 + RADIUS / 2
    //   balls[i].vx = -balls[i].vx
    // }
  }
  // 优化小球在画面内  右边缘大于0
  // 数组优化， 通过适合条件的索引， 将符合条件的数组重新排列， 不符合的通告数组的pop删除。此算法通过On解决了问题
  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
      balls[cnt++] = balls[i];
  }
  // console.log(balls, "balls...11");
  while (balls.length > Math.min(500, cnt)) {
    balls.pop();
  }
  // console.log(balls.length, "balls..22.");
}

// 添加小球
function addBalls(x, y, num) {
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        var aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, // 取正1还是-1 * 4
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        balls.push(aBall);
      }
    }
  }
}

// 渲染时分秒
function render(ctx) {
  ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  // 加背景色
  if(pattern){
    ctx.fillStyle = pattern
  }else{
    fetch("https://v1.hitokoto.cn/")
    .then((response) => response.json())
    .then((res) => {
      pattern = ctx.createPattern(createBackgroundCanvas(res.hitokoto),'repeat')
    });
  }
  ctx.fillStyle = pattern
  ctx.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)

  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
  var seconds = curShowTimeSeconds % 60;

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
  // 绘制小球
  renderBall(ctx);

  // console.log(balls.length)
}

// 渲染小球
function renderBall(ctx) {
  for (let i = 0; i < balls.length; i++) {
    ctx.fillStyle = balls[i].color;
    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }
}

// 渲染数字小球
function renderDigit(x, y, num, ctx) {
  ctx.fillStyle = "rgba(255,255,255,0.9)";
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
