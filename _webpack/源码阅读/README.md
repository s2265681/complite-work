
## 源码调试


- 通过npx webpack 找到node_modules下面的.bin
- 找到webpack文件下的runCli 
```js
const cli = {
	name: "webpack-cli",
	package: "webpack-cli",
	binName: "webpack-cli",
	installed: isInstalled("webpack-cli"),
	url: "https://github.com/webpack/webpack-cli"
};
const runCli = cli => {
	const path = require("path");
	const pkgPath = require.resolve(`webpack-cli\package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	require(path.resolve(path.dirname(pkgPath), pkg.bin['webpack-cli']));
};
runCli(cli)
```
- debugger 这个入口文件
node debugger 