const fs = require("fs");
fs.watch(
  "/Users/shangjiawei/MyGithub/complite-work/Source/webpack/demo/dist1.js",
  () => {
    console.log("舰艇");
  }
);
