const marked = require('marked');
const fs = require('fs');
const path = require('path');

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
});

// solarized-light
module.exports = async function (source) {
  // 返回的必须是处理后的js字符串
  let html = marked(source);
  var str = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document111</title>
      <link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
    </head>
      <body>
          ${html}
      </body>
   </html>
  `;
  console.log(str, 'strYYYY');
  const code = `export default ${JSON.stringify(str)}`;
  let resPath = path.parse(this.resourcePath);
  try {
    fs.mkdirSync('markdown');
  } catch (error) {}
  await fs.writeFileSync(`markdown/${resPath.name}.html`, str);
  return code;
};