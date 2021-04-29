const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");
module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].dll.js", //react.dll.js
    library: "_dll_[name]",//库的名字叫 _dll_[name]
  },
  plugins: [
    new DllPlugin({
      name: "_dll_[name]",
      path: path.join(__dirname, "dist", "[name].manifest.json"), //react.manifest.json
    }),
  ],
};
