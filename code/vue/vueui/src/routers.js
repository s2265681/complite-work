

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
import Hello from './components/HelloWorld'
import SpiderShow from './pages/SpiderShow'
import Pagination from './pages/Pagination'
import Table from './pages/Table'


const routes = [
    { path: '/', component: Hello },
    { path: '/spider', component: SpiderShow },
    { path: '/pagination', component: Pagination },
    { path: '/table', component: Table }
  ]
  
  export default routes;