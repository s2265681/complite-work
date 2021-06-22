
import React,{ Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Counter from './containers/Counter'
import Login from './containers/Login'
import App from './containers/App'
import  NotFound from './containers/NotFound'
import  Profile from './containers/Profile'



export default [
    {
        path: '/',
        component: App,
        loadData: App.loadData,
        routes:[
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
            },
            {
                path: '/login',
                component: Login,
                key: '/login'
            },
            {
                path: '/profile',
                component: Profile,
                key: '/profile'
            },
            
            {
                component: NotFound,
                key: '/NotFound'
            }
        ]
    }
]

// 集中式路由
// export default [
//         {
//             path: '/',
//             component: Home,
//             exact: true,
//             key: '/',
//             // 加载数据，如果此配置项有了这个属性，那么意味着需要加载异步数据
//             loadData: Home.loadData
//         },
//         {
//             path: '/counter',
//             component: Counter,
//             key: '/counter'
//         }
//     ]

// export default (
//     <Fragment>
//         <Route path="/" exact component={Home}/>
//         <Route path="/counter" exact component={Counter}/>
//     </Fragment>
// )
