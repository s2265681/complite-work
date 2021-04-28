// import 'px2rem-loader!./index.css'  // 使用内联loader 单独设置这
import './index.css'
// import 'amfe-flexible'
import '../amfe.flexible.js'

import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Button } from 'antd'

// antd已经做了转换，再次转换会有问题
ReactDOM.render(<Button type='primary'>按钮</Button>,document.getElementById('root'))