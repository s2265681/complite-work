const marked = require('marked');
const fs = require('fs');
const path = require('path');
const light = require('highlight.js');

marked.setOptions({
  highlight: function (code) {
    let res;
    res = light.highlightAuto(code).value;
    return res;
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
      <pre>
        <code class="language-html">
          ${html}
        </code>
      </pre>
      </body>
   </html>
  `;
  const code = `export default ${JSON.stringify(str)}`;
  let resPath = path.parse(this.resourcePath);
  try {
    await fs.mkdirSync('dist/markdown');
  } catch (error) {}
  await fs.writeFileSync(`dist/markdown/${resPath.name}.html`, str);
  return code;
};
