let babel = require("@babel/core");
let loaderUtils = require("loader-utils");
function loader(source) {
  let options = loaderUtils.getOptions(this);
  console.log(options, "options");
  console.log(this,'this')
  let cb = this.async();
  babel.transform(
    source,
    {
      ...options,
      sourceMap: true,
      filename: this.resourePath
    },
    function (err, result) {
      cb(err, result.code);
      console.log(result,'result....')
    }
  );
  return source;
}
module.exports = loader;