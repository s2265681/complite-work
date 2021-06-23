let less = require('less'),
    fs = require('fs');
less.render(fs.readFileSync('./1.less','utf-8'),(err,result) => {
  // console.log(result,'result.css')
   fs.writeFileSync('./1.css', result.css, 'utf-8')
})