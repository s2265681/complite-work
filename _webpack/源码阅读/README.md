## 一、源码调试

- 通过 npx webpack 找到 node_modules 下面的.bin
- 找到 webpack 文件下的 runCli

```js
const path = require("path");
const pkgPath = require.resolve(`webpack-cli/package.json`);
const pkg = require(pkgPath);
require(path.resolve(path.dirname(pkgPath), "./bin/cli.js"));
```

- debugger 这个入口文件
  node debugger

思路

- 折叠无关，只看主流程
- 寻找关键路径，根据变量名方法名擦猜测意图
- debugger 关键路径，理解执行过程

## 二、webpack 整个流程

### 1、启动编译

- 新建一个 Compiler(全局只有一个，记录着 webpack 的声明周期),Compition（代表每一次编译，构建后的产物）
- Compiler 是 webpack 的核心模块，每次构建，都会实例化一个 Compiler 对象，然后调用他的 run 方法 ◊ 启动一次完整的编译
- 都继承于 tapable

> 读取 > requireConfig

> 创建 compiler > webpack(options)

> 开始编译 > compiler.run

run.js

```js
const webpack = require("webpack");
const config = require("./webpack.config");

let compiler = webpack(config);

compiler.run((err, state) => {
  console.log(err);
  console.log(state);
});
```

// 分析 tapable webpack 的每个钩子

```js
Object.keys(this.hooks).forEach((hookName) => {
  let hook = this.hooks[hookName];
  if (hook.tap) {
    hook.tap("show", () => {
      let hooType = Object.getPrototypeOf(hook).constructor.name;
      console.log(`Compiler ${hookName} ${hooType} ${hook._args}`);
    });
  }
});
```

### 2、webpack的执行流程

Compiler的钩子
- environment SyncHook  设置node环境变量
- afterEnvironment SyncHook  设置环境变量完成
- entryOption SyncBailHook context,entry  解析入口文件
- afterPlugins SyncHook compiler  挂在插件结束
- afterResolvers SyncHook compiler  解析路径后触发
- beforeRun AsyncSeriesHook compiler  开始运行前
- run AsyncSeriesHook compiler  开始运行
- normalModuleFactory SyncHook normalModuleFactory  创建模块工厂
- contextModuleFactory SyncHook contextModulefactory  创建上下文模块工厂
- beforeCompile AsyncSeriesHook params  开始编译前
- compile SyncHook params  编译
- thisCompilation SyncHook compilation,params  启动编译
- compilation SyncHook compilation,params  创建一个compition
- make AsyncParallelHook compilation  最核心代码 从入口文件开始编译
- afterCompile AsyncSeriesHook compilation  编译完成
- shouldEmit SyncBailHook compilation  是否要生成文件
- emit AsyncSeriesHook compilation  生成文件
- afterEmit AsyncSeriesHook compilation  资源已经生成
- done AsyncSeriesHook stats  整个编译完成


Compition的钩子
- addEntry SyncHook entry,name  添加入口 ./src/index.js
- buildModule SyncHook module  编译入口模块
- normalModuleLoader SyncHook loaderContext,module  拿到正常模块加载起
- succeedModule SyncHook module  成功加载模块
- succeedEntry SyncHook entry,name,module  入口解析成功
- finishModules AsyncSeriesHook modules  完成模块编译
- seal SyncHook  封包， 一旦封装之后，不能再向内添加新的模块了
- optimizeDependenciesBasic SyncBailHook modules  优化依赖项
- optimizeDependencies SyncBailHook modules  
- optimizeDependenciesAdvanced SyncBailHook modules
- afterOptimizeDependencies SyncHook modules

- beforeChunks SyncHook  生成chunk
- afterChunks SyncHook chunks 完成生成chunk

- optimize SyncHook  优化模块
- optimizeModulesBasic SyncBailHook modules
- optimizeModules SyncBailHook modules
- optimizeModulesAdvanced SyncBailHook modules
- afterOptimizeModules SyncHook modules

- optimizeChunksBasic SyncBailHook chunks,chunkGroups  优化chunk
- optimizeChunks SyncBailHook chunks,chunkGroups
- optimizeChunksAdvanced SyncBailHook chunks,chunkGroups
- afterOptimizeChunks SyncHook chunks,chunkGroups

- optimizeTree AsyncSeriesHook chunks,modules  优化依赖树
- afterOptimizeTree SyncHook chunks,modules
- optimizeChunkModulesBasic SyncBailHook chunks,modules
- optimizeChunkModules SyncBailHook chunks,modules
- optimizeChunkModulesAdvanced SyncBailHook chunks,modules
- afterOptimizeChunkModules SyncHook chunks,modules

- shouldRecord SyncBailHook  是否要记录
- reviveModules SyncHook modules,records  比对恢复
- optimizeModuleOrder SyncHook modules  优化模块顺序
- advancedOptimizeModuleOrder SyncHook modules
- beforeModuleIds SyncHook modules  处理模块id

- moduleIds SyncHook modules
- optimizeModuleIds SyncHook modules
- afterOptimizeModuleIds SyncHook modules
- reviveChunks SyncHook chunks,records
- optimizeChunkOrder SyncHook chunks
- beforeChunkIds SyncHook chunks
- optimizeChunkIds SyncHook chunks
- afterOptimizeChunkIds SyncHook chunks
- recordModules SyncHook modules,records  记录模块
- recordChunks SyncHook chunks,records  记录chunk
- beforeHash SyncHook   
- chunkHash SyncHook chunk,chunkHash  生成hash
- contentHash SyncHook chunk  
- afterHash SyncHook 
- recordHash SyncHook records  记录hash
- beforeModuleAssets SyncHook  生成模块资源之前
- shouldGenerateChunkAssets SyncBailHook  是否生成模块资源
- beforeChunkAssets SyncHook 生成代码块资源之前
- chunkAsset SyncHook chunk,filename
- additionalChunkAssets SyncHook chunks  添加额外资源
- record SyncHook compilation,records  
- additionalAssets AsyncSeriesHook 
- optimizeChunkAssets AsyncSeriesHook chunks
- afterOptimizeChunkAssets SyncHook chunks
- optimizeAssets AsyncSeriesHook assets   压缩资源
- afterOptimizeAssets SyncHook assets
- needAdditionalSeal SyncBailHook  
- afterSeal AsyncSeriesHook  封装之后
- needAdditionalPass SyncBailHook 


> - 模块 、 代码块、 资源、 入口