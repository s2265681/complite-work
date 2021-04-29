

const webpack = require('webpack')
const config = require('./webpack.config')

debugger

let compiler = webpack(config);


compiler.run((err,state)=>{
    // console.log(err)
    // console.log(state)
})
