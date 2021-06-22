let path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');
module.exports= merge(base,{
    mode:'development',
    entry:'./src/client/index.js',
    output:{
        path:path.resolve('public'),
        filename:'client.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    }
                ]
            }
        ]
    }
})