// // var env = require('./../env/index')
// // console.log(process,'process.env.NODE_ENV')
// if (process.env.NODE_ENV == 'development') {
//  // imgBaseUrl = '/img/';
//     // baseUrl = 'http://127.0.0.1:2918';
//     // console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
//     // console.log('dd123')
//     module.exports = {
//       devServer: {
//         // 设置主机地址
//         host: 'localhost',
//         //线上
//         // host: '39.96.71.193',
//         // 设置默认端口
//         port: 8081,
//         // 设置代理
//         proxy: {
//           // env
//           '/api':{
//             // 设置目标API地址
//             // target: 'http://127.0.0.1:2918',
//            // 线上
//             // target: 'http://39.96.71.193:3389',
//             // 如果要代理 websockets
//             ws: false,
//             // 将主机标头的原点改为目标URL
//             changeOrigin: false
//           }
//         }
//       }
//     }
     

// }else if(process.env.NODE_ENV == 'production'){
//   // console.log('dd')
// 	// baseUrl = 'http://127.0.0.1:2918';
//     // imgBaseUrl = '//elm.cangdu.org/img/';
//     module.exports = {
//       devServer: {
//         // 设置主机地址
//         // host: 'localhost',
//         //线上
//         host: '39.96.71.193',
//         // 设置默认端口
//         port: 8081,
//         // 设置代理
//         proxy: {
//           // env
//           '/api':{
//             // 设置目标API地址
//             // target: 'http://127.0.0.1:2918',
//            // 线上
//             target: 'http://39.96.71.193:3389',
//             // 如果要代理 websockets
//             ws: false,
//             // 将主机标头的原点改为目标URL
//             changeOrigin: false
//           }
//         }
//       }
//     }
// }

