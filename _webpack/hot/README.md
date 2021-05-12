


调试模式
node debugger.js

热更新 配置
- devServer 开启 hot:true
- new webpack.HotModuleReplacementPlugin()

热更新原理
webpack：处理配置
http： 相应请求
socket服务器： 
客户端请求index.html 生成index.html main.js
服务器请求生成的资源
websocket客户端通过长链接链接到websocket服务器
每当源文件发生改变后，会通知webpack重新打包，websocket服务器会向客户端发消息，重新拉新的代码，更新

### 服务端devServer操作
首先通过devServer，开启一个本地服务，启用webpack的watch监听，是每次编译拿到最新结果得重点。 初始化webpack，初始化compiler对象， 注册webpack的done事件回调，每次拿到结果后，通过中间件设置展示访问的index页面，注册socket 在每次编译完后，emit最新的hash和ok通知客户端做相应操作

步骤
1. 启动webpack-dev-server服务器
2. 创建webpack实例
3. 创建Server服务器
4. 添加webpack的done事件回调，编译完成后向客户端发消息
5. 创建express应用app
6. 添加webpack-dev-middleware中间件，中间件负责返回生成的文件
7. 设置文件系统为内存文件系统
8. 创建http服务器并启动服务
9. 使用sockjs在浏览器和服务端之间建立一个websock长链接，创建socket服务器


### 客户端
客户端的操作也需要依赖webpack.HotModuleReplacementPlugin()这个插件，会将每次编译差异部分的代码，写入到不同文件中，客户端要做的就是拿到这些文件，下载通过script引入，执行全局的webpackHotUpdate方法，将需要更新的模块中的方法进行执行


步骤
1. webpack-dev-server/client-src/default/index.js 监听hash消息，保存hash值
2. 客户端收到ok消息，会调用reloadApp方法进行更新
3. reloadApp方法中会判断是否支持热更新，不支持之间刷新页面，支持会发射webpackHotUpdate事件
4. 当监听到webpackHotUpdate事件后，后进行check方法检查
5. check方法后调用module.hot.check方法
6. 通过调用JsonpMainTemplate.runtime.js 的webpackUpdateChunk方法通过jsonP获取最新的代码块
7. 布丁JS取回来后，会继续调用HotModuleReplace.runtime 的hotAddUpdateChunk方法动态更新模块代码
8. 调用hotApply方法进行热更新