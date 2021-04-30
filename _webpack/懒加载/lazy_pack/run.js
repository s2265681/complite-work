const webpack = require("webpack");
const config = require("./webpack.config");

let compiler = webpack(config);

compiler.run((err, stats) => {
  // console.log(err)
  console.log(stats);
  if (err) {
    console.log(err);
  } else {
    console.log(
    //   stats.toJson({
    //     hash: true,
    //     assets: false,
    //   })
    );
  }
});
