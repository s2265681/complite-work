const isDebug = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'
let webpackConfig = {}
// console.log(isDebug,'isDebug>>>>')
if (isDebug) { // development
  webpackConfig = {
    lintOnSave: false, // 保存时候 lint
    devServer: { // devServer 配置
      port: 8333,
      disableHostCheck: true,
      open:true,
      hot:true
    },
    chainWebpack: config => {
      config.resolve
        .symlinks(true)
      config
        .entry('app')
          .clear()
          .add('./src/example/main.ts')
          .end()
        .plugin('html')
          .tap(args => {
            args[0].template = './src/example/index.html'
            return args
          })
      return config
    }
  }
} else { // production
  webpackConfig = {
    lintOnSave: false, // 保存时候 lint
    outputDir: 'build', // output 目录
    productionSourceMap: false, // 是否打 sourcemap
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本，设置成 true 可以使用 template，但是大小会大 10kb 左右
    chainWebpack: config => {
      // entry 这些在命令行做了
      config
        .performance
          .hints(false) // 去除资源大小提示

      return config
    }, // webpack 配置
    css: {
      modules: false, // 是否作为 CSS Modules 模块
      extract: true, // 是否抽取 CSS 到独立文件，默认 porduction = true，development = false
      sourceMap: false, // 是否为 CSS 开启 source map
      loaderOptions: {}, // 向 CSS 相关的 loader 传递选项
    },
  }
}

module.exports = webpackConfig