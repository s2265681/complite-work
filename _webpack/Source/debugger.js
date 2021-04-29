const path = require("path");
const pkgPath = require.resolve(`webpack-cli/package.json`);
// const pkg = require(pkgPath);
require(path.resolve(path.dirname(pkgPath),'./bin/cli.js'));
