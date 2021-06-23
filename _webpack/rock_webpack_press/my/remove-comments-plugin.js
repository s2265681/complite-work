// 去掉 /******/
class RemoveCommentsPlugin {
  apply(complier) {
    // complier 中包含来我们此次构建所以配置
    // console.log(complier, "complier");
    complier.hooks.emit.tap("RemoveCommentsPlugin", (complier) => {
      // complier 可以理解为此次打包的上下文
      for (const name in complier.assets) {
        // console.log(name, "name>>"); // 输出文件名称
        if (name.endsWith(".js")) {
          const contents = complier.assets[name].source();
          const noComments = contents.replace(/\/\*+\//g, "");
          complier.assets[name] = {
            source: () => noComments,
            size: () => noComments.length,
          };
        }
      }
    });
  }
}
module.exports = RemoveCommentsPlugin;
