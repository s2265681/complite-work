const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const htmlPlugins = ['index', 'login'].map((item) => {
  return new HtmlWebpackPlugin({
    template: `./public/${item}.html`,
    filename: `${item}.html`,
    chunks: [item], // 设置多入口时的打包的哪个js进来，不写全部引入
    minify: {
      collapseWhitespace: true, // 去除空格
      removeComments: true, // 去掉注释
      removeAttributeQuotes: true, // 去除属性的双引号
      removeEmptyAttributes: true, // 去除空属性
      removeEmptyElements: true,
    },
  });
});

module.exports = {
  // 设置编译的入口文件
  mode: 'production',
  // entry: './src/main.js',
  entry: {
    // jquery: 'jquery',
    index: './src/main.js',
    login: './src/login.js',
  },
  // 设置编译的出口文件
  output: {
    // 编译后的文件
    filename: '[name].[hash].min.js',
    path: path.resolve(__dirname, 'build'),
  },
  // 配置devServer
  devServer: {
    // 端口
    port: 3000,
    // 开启GZIP压缩
    compress: true,
    // 显示编译进度
    progress: true,
    // 指定访问资源目录
    contentBase: path.resolve(__dirname, 'build'),
    // 自动打开浏览器
    open: true,
    // 开启热更新
    hot: true,
    // 请求代理
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:8888',
    //     secure: false, // true 为https ， false 为http
    //     changeOrigin: true, // 把请求头当中的host值改为服务器地址
    //   },
    // },
  },
  // 设置优化项
  optimization: {
    // 设置压缩方式
    // minimize: true,
    minimizer: [
      //=> 压缩CSS(但是必须指定JS压缩方式)
      new OptimizeCssAssetsWebpackPlugin(),
      //=> 压缩JS 下面两个用一个即可
      new UglifyjsWebpackPlugin({
        cache: true, // 是否使用缓存
        parallel: true, // 是否是并发编译
        sourceMap: true, // 启动远吗映射 (方便调试)
      }),
      // new TerserPlugin()
    ],
  },
  module: {
    // 模块规则，使用加载器，从右向左执行，从下向上执行
    rules: [
      // 处理CSS
      {
        test: /\.(css|less)$/i, // 基于正则处理
        use: [
          // 'style-loader', // css插入到HEAD中
          MiniCssExtractPlugin.loader,
          'css-loader', // 编译解析@import/URL这种语法
          'postcss-loader', // 设置前缀，兼容css3写法
          {
            loader: 'less-loader',
            options: {
              // 加载器额外配置
            },
          },
        ],
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|ico|bmp|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            // 把指定图片大小内的图片BASE64
            // 不再指定范围的采用file-loader进行处理
            // 符合规则的用url-loader处理，不符合的仍然用file-loader处理
            loader: 'url-loader',
            options: {
              limit: 1 * 1024, // 小于200kb处理成BASE64
              outputPath: './images', // 图片编译后都放在统一的images文件下
              name: '[name].[hash].[ext]',
              esModule: false,
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      // 处理HTML页面中的图片,按照上面的处理机制处理
      {
        test: /\.html$/,
        use: ['html-withimg-loader'],
      },
      // 处理JS
      {
        test: /\.(jsx?)$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                //=> ES6 转成 ES5
                '@babel/preset-env',
              ],
              //=> 基于插件处理ES6、ES7中的CLASS的特殊语法
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    legacy: true,
                  },
                ],
                [
                  '@babel/plugin-proposal-class-properties',
                  {
                    loose: true,
                  },
                ],
                '@babel/plugin-transform-runtime',
              ],
            },
          },
          // 开启语法检测
          "eslint-loader" 
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   // 模版路径
    //   template: './public/index.html',
    //   // 编译后生成的文件名
    //   filename: 'index.html',
    //   // 是否把编译后的资源文件导入页面中都设置HASH(清缓存，和output中设置HASH值是一样的， 和output设置HASH是一样的效果，只要设置一个地方即可)
    //   // hash: true, // 和output的HASH设置，设置一个即可
    //   // 把模版中的HTML代码也进行压缩编译配置
    //   // https://github.com/kangax/html-minifier
    //   minify: {
    //     collapseWhitespace: true, // 去除空格
    //     removeComments: true, // 去掉注释
    //     removeAttributeQuotes: true, // 去除属性的双引号
    //     removeEmptyAttributes: true, // 去除空属性
    //     removeEmptyElements: true,
    //   },
    // }),
    // 多入口文件的处理
    ...htmlPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
    }),
  ],
};
