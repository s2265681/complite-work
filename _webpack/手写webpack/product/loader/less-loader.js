

let less = require('less')
function Loader(source){
    let css = ''
    less.render(source,(err,c)=>{
        css = c.css;
    }) 
    css =css.replace(/\n/g,'\\n;')
    return css
}

module.exports = Loader