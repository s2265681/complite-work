
import {TAG_ROOT} from './contants'

/**
 * render 渲染到容器内部
 */
function render(element,container){
   let rootFilber = {
       tag: TAG_ROOT, //  每个filber会有一个tag标示，代表此元素的类型
       stateNode:container,  // 如果原生节点的话，stateNode指向真是DOM元素
       // props.children 是一个数组，里面放的是React元素，虚拟DOM后面会根据每一个React元素创建一个
       props:{children:[element]}   // children 属性，里面放的是要渲染的元素
   }
   // 遍历dom,从根节点开始
   scheduleRoot(rootFilber)
}

const ReactDOM = {
    render
}

export default ReactDOM;


// 调度包
// scheduleRoot