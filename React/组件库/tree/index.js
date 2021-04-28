import Tree from './tree.jsx';
import '../../style/tree.scss'
Tree.install = (app) => { // 注册全局组件
    app.component(Tree.name,Tree)
}
export default Tree