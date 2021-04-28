const path = require("path");//处理路径的
console.log(process.cwd());
const baseDir = process.cwd().replace(/\\/g,path.posix.sep);//根目录 /
console.log(baseDir);
const entry = path.posix.join(baseDir, "src/index.js");//打包的入口文件
console.log(entry);
const moduleId = "./" + path.posix.relative(baseDir, entry);
console.log(moduleId);// moduleId
//因为在 //webpack里  moduleId都是相于根目录相对路径 

console.log(__dirname);
//path.dirname('c:/a/b.js');c:/a
//cwd 当前工作目录,它是会变的
//__dirname代表当前模 块所以目录