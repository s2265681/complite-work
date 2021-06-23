import { ELEMENT_TEXT, PLACEMENT } from "./contants";
import {setProps} from './util'
/**
 * 从跟节点开始渲染和调度
 * 两个阶段
 * 一：diff阶段，对比新旧的虚拟DOM，进行增量，更新，和创建，render阶段
 *    这个阶段可能比较花时间，我们可以对任务进行拆分，拆分的虚拟dom， 时间切片，任务拆分 可以暂停
 *    render 阶段成果是effect list 知道哪些节点
 *    render 阶段（diff阶段）两个任务1、根据虚拟dom生成fiber树，收集effectlist，要知道哪个节点增加。。
 * 二； commit会创建dom，更新dom ，此阶段不能暂停，否则页面卡顿
 */
let nextUnitOfWork = null;  // 下一个工作单元
let workInProgessRoot = null;  // rootFilber 应用的根  , 不变 方便找根

export default function scheduleRoot(rootFiber){  
    workInProgessRoot = rootFiber;
    nextUnitOfWork = rootFiber;
}

// 执行
function performUnitOfWork(currentFilber){
      beginWork(currentFilber)  // 开
      if(currentFilber.child){
          return currentFilber.child
      }
      while(currentFilber){
        completeUnitOfWork(currentFilber) // 没有儿子让自己完成
        if(currentFilber.sibling){
            return currentFilber.sibling
        }
        currentFilber = currentFilber.return; //找父亲，然后让父亲找弟弟，找叔叔的操作
      }
}
// 收集有副作用的fiber 然后组成effect list  effect链等于完成链
function completeUnitOfWork(currentFilber){  // 第一个完成的是A1 TEXY
   let returnFiber = currentFilber.return;  // A1
   if(returnFiber){
       //////////////////////把自己儿子的effect链挂在到父亲身上
       if(!returnFiber.firstEffect){
           returnFiber.firstEffect = currentFilber.firstEffect
       }
       if(returnFiber.lastEffect){ // 如果returnFiber.lastEffect有值
           if(returnFiber.lastEffect){
            returnFiber.lastEffect.nextEffect = currentFilber.firstEffect;
           }else{
            returnFiber.lastEffect.nextEffect = currentFilber.lastEffect;
           }
       }
       //////////////////////把自己挂到父亲身上
       const effectTag = currentFiber.effectTag;
       if(effectTag){  // 自己副作用 A1 的firstEffect和lastEffect都指向currentFiber
        // 每个fiber有两个属性，firstEffect执行第一个有副作用的子fiber lastEffect指向最后一个有副作用的子fiber
        // 中间的用nextEffect做成一个但链表 firstEffect = 大儿子.nextEffect -》 三儿子
        if(returnFiber.lastEffect){
            returnFiber.lastEffect.nextEffect = currentFiber;
        }else{

        }
          returnFiber.firstEffect = currentFilber;
          returnFiber.lastEffect = currentFilber;
       }
   }
}
/**
 * 开始收下线的钱
 * completeUnitOfWork 把下线的钱收完了 
 * 1、创建真是DOM元素
 * 2、穿件子fiber   ·
 */
function beginWork(currentFilber){
     if(currentFilber.tag === TAG_ROOT){
         updateHostRoot(currentFilber)
     }else if(currentFilber.tag === TAG_TEXT){
        updateHostText(currentFilber)
     }else if(currentFilber.tag === TAG_HOST){
        updateHost(currentFilber)
     }
}
function updateHost(currentFilber){
   if(!currentFilber.stateNode){
    currentFilber.stateNode = createDOM(currentFilber)
   }
   const newChildren = currentFilber 
}

function createDOM(currentFiber){
    if(currentFiber.tag === TAG_TEXT){
        return document.createTextNode(currentFiber.props.text)
    }else if(currentFiber.tag === TAG_HOST){  // span div
        return document.createElement(currentFiber.type)  // div
        updateDOM(stateNode,{},currentFiber.props);
        return stateNode
    }
}

function updateDOM(stateNode)

function updateHostText(){
    if(!currentFiber.stateNode){
        currentFiber.stateNode = createDOM(currentFiber)
    }
}
// 更新根节点
function updateHostRoot(currentFilber){
    // 先处理自己， 如果是原生节点，创建真是DOM
    let newChildren = currentFilber.props.children;  // [element]
    reconcileChildren(currentFilber,newChildren)
}

// 调子节点 子fiber
function reconcileChildren(){
   let newChildIndex = 0;  // 新子节点的索引
   let prevSibling; // 上一个新的子fiber
   // 要遍历子虚拟DOM元素数组，为每个虚拟DOM元素创建Fiber
   while(newChildIndex < newChildIndex.length) {
       let newChild = newChildren[newChildIndex]  // 取出虚拟DOM节点 【A1】 type:A1
       let tag;

       if(newChild.type == ELEMENT_TEXT){
           tag = TAG_TEXT  // 这是一个文本节点 
       }else if(typeof newChild.type === 'string'){
           tag = TAG_HOST;  // 如果type是个字符串，那么这是一个原生DOM节点 "A1" div
       }
       // 根据虚拟dom创建fiber， 再completeUnitOfWork的时候收集effect
       let newFiber = {
            tag,  // TAG_HOST
            type:newChild.type, // div
            props:newChild.props,  // {id:A1 style={style}}
            stateNode:null,     // div 还没有创建DOM元素
            return :currentFiber,  // 父Fiber returnFiber
            effectTag:PLACEMENT,  // 副作用标示 render我们会收集副作用，
            nextEffect:null // effect list 也是一个单链表
            // effect list 顺序和完成顺序是一样的
       }
       // 最小儿子没有sibling
       if(newFiber){
           if(newChildIndex == 0 ){   // 如果当前索引为0，说明太子
               currentFiber.child = newFiber;
           }else{
              prevSibling.sibling = newFiber; // 让太子的弟弟指向二黄子，依次后指
           }
           prevSibling = newFiber
       }
      newChildIndex++
   }

}

// 写一个工作循环,循环执行工作
function workLoop(deadline){
    let shouldYield = false;  // 是都要让出时间片段或者控制权
    while(nextUnitOfWork && !shouldYield){  // 有的话给performUnitOfWork执行，返回一个新的performUnitOfWork
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1;  // 没有时间就要让出控制权
    }
    if(!nextUnitOfWork){  // 如果时间骗到期还有任务没有执行完成，就需要浏览器再次调度
        console.log('render阶段结束')
        ///////////要提交了
        commitRoot();
    }
    // 不管有没有任务都需要浏览器再次调度，每一帧都要执行一次workLoop
    requestIdleCallback(workLoop,{timeout:500});
}

function commitRoot(){
    let currentFiber = workInProgessRoot.firstEffect;
    while(currentFiber){
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;

    }
    workInProgessRoot = null
}

function commitWork(currentFiber){
   if(!currentFiber) return 
   let currentFiber = currentFiber.return;
   let returnDom = returnFiber.stateNode;
   if(currentFiber.effectTag === PLACEMENT){  // 添加。。
       returnDom.appenChild();
   }
   currentFiber.effectTag = null;
}



// 请求浏览器的调度 requestIdleCallback  告诉浏览器  我现在有任务， 让浏览器闲的时候来帮我执行。
// 有一个优先级的概念  很复杂， expirationTime  先写个500ms  浏览器空闲就调workLoop
requestIdleCallback(workLoop,{timeout:500});