
import React,{ Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Counter from './containers/Counter'


// 集中式路由
export default [
        {
            path: '/',
            component: Home,
            exact: true,
            key: '/',
            // 加载数据，如果此配置项有了这个属性，那么意味着需要加载异步数据
            loadData: Home.loadData
        },
        {
            path: '/counter',
            component: Counter,
            key: '/counter'
        }
    ]

// export default (
//     <Fragment>
//         <Route path="/" exact component={Home}/>
//         <Route path="/counter" exact component={Counter}/>
//     </Fragment>
// )
