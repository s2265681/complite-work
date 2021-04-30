
class Plu{
    apply(compiler){
        compiler.hooks.emit.tap('emit',function(data){
            // console.log(compiler,'emit事件发射')
        })
    }
}
module.exports = Plu
