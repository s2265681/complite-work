[url](https://mp.weixin.qq.com/s/x9TwpDsrLJyWVHPWOfYM0Q)

# why need shader

## 渲染管线

Webgl 渲染依赖底层 GPU 的渲染能力， 所以 Webgl 渲染流程和 GPU 内部的渲染管线是相符的

渲染管线的作用是将 3D 模型转换为 2 维图像

早期的渲染管线不可变成

![](https://mmbiz.qpic.cn/mmbiz_png/pqcWLvSo2kjw4Hzb1ty71mnNVw5GhibM2TYvTveeKm5F6Ywib8PicickZGiaa9Bbt5H7OnialIAHZEleFmkUtcib6fqCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 初始化

创建一个 webgl 画布

```js
<canvas id="webgl" width="500" height="500"></canvas>
```

创建 webgl 上下文

```js
const gl = docuemnt.getElementById("webgl").getContext("webgl");
```

### 创建着色器程序

![](https://mmbiz.qpic.cn/mmbiz_png/pqcWLvSo2kjw4Hzb1ty71mnNVw5GhibM2UloqpiaZEcugiaR0OYTnhQlceDlJjAOOnsLpsxcH5Y3qUTglsVUs1GicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```js
const vertexShader = gl.createShader(gl.VERTEX_SHADER); // 顶点着色器
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // 片元着色器
```

### 绑定数据源

写法有很多种
1、script 标签 type notjs 这样
2、模版字符串

顶点着色器写法

```js
const vertexShaderSource = `
   attribute vec4 a_position;
   void main() {
       gl_Position = a_position;
   }
`;
```

片元着色器

```js
const fragmentShaderSource = `
   void main(){
       gl_FragColor = vec4(1.0,0.0,0.0,1.0);
   }
`;
```

绑定数据

```js
gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragmentShader, fragmentShaderSource);
```

编译着色器、绑定着色器、连接着色器程序、使用着色器程序

```js
// 编译着色器
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

// 创建着色器程序
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// 连接 并使用着色器
gl.linkProgram(program);
gl.useProgram(program);
```

数据写入缓冲区

```js
// 首先创建一个顶点缓冲区对象（Vertex Buffer Object, VBO）
const buffer = gl.createBuffer();
// 为webgl绑定buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
```

新建数组， 存入缓冲区

```js
const data = new Float32Array([0.0, 0.0, -0.3, -0.3, 0.3, -0.3]);
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
```

从缓冲区读取数据

```js
// 从刚才创建的GLSL着色程序中找到这个属性值所在的位置
const aposlocation = gl.getAttribLocation(program, "a_position");

// 启用对应属性
gl.enableVertexAttribArray(aposlocation);

// 从缓冲中读取数据绑定给被激活的「aposlocation」的位置
gl.vertexAttribPointer(aposlocation, 2, gl.FLOAT, false, 0, 0);
```

### 渲染

```js
// 清楚canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 绘制三角形
gl.drawArrays(gl.TRIANGLES, 0, 3); // 类型、从第几个顶点开始、绘制多少个点
```

绘制类型
![](https://mmbiz.qpic.cn/mmbiz_png/pqcWLvSo2kjw4Hzb1ty71mnNVw5GhibM2UrPtUmg8vuBytHUKUy4iaSOO1V095SXiczDA9jh0MdiabJzJHyWO4Qticg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 矩阵的使用

```js
// 改写顶点着色器
const vertexShaderSource = `
  attribute vec4 a_position;
  // 添加矩阵代码
  uniform mat4 u_mat;
  void main() {
      gl_Position = u_mat * a_position;
  }
`;

// 然后和属性一样，我们需要找到 uniform 对应的位置
const matlocation = gl.getUniformLocation(program, "u_mat");

// 然后初始化一个缩放举证
const mat = new Float32Array([
  Tx,
  0.0,
  0.0,
  0.0,
  0.0,
  Ty,
  0.0,
  0.0,
  0.0,
  0.0,
  Tz,
  0.0,
  0.0,
  0.0,
  0.0,
  1.0,
]);

gl.uniformMatrix4fv(matlocation, false, mat); // 全局变量的位置, 是否为转置矩阵, 矩阵数据

// 实现一个动画
let Tx = 0.1; //x坐标的位置
let Ty = 0.1; //y坐标的位置
let Tz = 1.0; //z坐标的位置
let Tw = 1.0; //差值
let isOver = true;
let step = 0.08;
function run() {
  if (Tx >= 3) {
    isOver = false;
  }
  if (Tx <= 0) {
    isOver = true;
  }
  if (isOver) {
    Tx += step;
    Ty += step;
  } else {
    Tx -= step;
    Ty -= step;
  }
  const mat = new Float32Array([
    Tx,
    0.0,
    0.0,
    0.0,
    0.0,
    Ty,
    0.0,
    0.0,
    0.0,
    0.0,
    Tz,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
  ]);
  gl.uniformMatrix4fv(matlocation, false, mat);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // 使用此方法实现一个动画
  requestAnimationFrame(run);
}
```

### 汇总

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <canvas id="webgl" width="500" height="500"></canvas>
  </body>
  <script>
    const gl = document.getElementById("webgl").getContext("webgl");

    const vertexShaderSource = `
        attribute vec4 a_position;
        // 添加矩阵代码
        uniform mat4 u_mat;
        // 变量
        varying vec4 v_color;
        void main() {
            gl_Position = u_mat * a_position;
            v_color =  gl_Position * 0.5 + 0.5;
        }
    `;
    const fragmentShaderSource = `
        precision lowp float;
        varying vec4 v_color;
        void main(){
            // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
            gl_FragColor = v_color;
        }`;

    // 创建着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER); // 顶点着色器
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // 片元着色器
    // 绑定数据源
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // 编译着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // 创建着色器程序
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 连接 并使用着色器
    gl.linkProgram(program);
    gl.useProgram(program);

    // 检测是不是创建程序成功...
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    console.log(success, "success");

    //首先创建一个顶点缓冲区对象
    const buffer = gl.createBuffer();

    // 接下来需要为WebGL绑定这个buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // 新建一个数组 然后并把数据存入到缓冲区中。
    const data = new Float32Array([0.0, 0.0, -0.3, -0.3, 0.3, -0.3]);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // 从缓冲中读取数据
    // 从刚才创建的GLSL着色程序中找到这个属性值所在的位置
    const aposlocation = gl.getAttribLocation(program, "a_position");

    // 启用对应属性
    gl.enableVertexAttribArray(aposlocation);

    // 从缓冲中读取数据绑定给被激活的「aposlocation」的位置
    gl.vertexAttribPointer(aposlocation, 2, gl.FLOAT, false, 0, 0);

    // 渲染
    // 清楚canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, 3); // 类型、从第几个顶点开始、绘制多少个点

    // 然后和属性一样，我们需要找到 uniform 对应的位置
    const matlocation = gl.getUniformLocation(program, "u_mat");

    // 实现一个动画
    let Tx = 0.1; //x坐标的位置
    let Ty = 0.1; //y坐标的位置
    let Tz = 1.0; //z坐标的位置
    let Tw = 1.0; //差值
    let isOver = true;
    let step = 0.08;
    function run() {
      if (Tx >= 3) {
        isOver = false;
      }
      if (Tx <= 0) {
        isOver = true;
      }
      if (isOver) {
        Tx += step;
        Ty += step;
      } else {
        Tx -= step;
        Ty -= step;
      }
      const mat = new Float32Array([
        Tx,
        0.0,
        0.0,
        0.0,
        0.0,
        Ty,
        0.0,
        0.0,
        0.0,
        0.0,
        Tz,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
      gl.uniformMatrix4fv(matlocation, false, mat);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 使用此方法实现一个动画
      requestAnimationFrame(run);
    }
    run();
  </script>
</html>
```
