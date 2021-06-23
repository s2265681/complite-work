
/**
 * 1、从顶点开始遍历
 * 2、如果有儿子先遍历第一个儿子，先遍历大儿子，如果没有儿子，找弟弟，没有弟弟找叔叔
 * A1
 * B1   B2
 * C1   C2
 * 
 * 3、A1 -》 B1 -》 C1--》 C2--》B2 --》 A1  -- 》 结束
 * 
 */
let rootFiber = require('./element')
let nextUnitOfWork =null; // 下一个执行单元

function workLoop(){
    // while((deadline.timeRemaining() >0|| deadline.didTimeout) && nextUnitOfWork){   
    while(nextUnitOfWork){  // 如果有待执行的执行单元，就执行，然后返回下一个执行单元
        nextUnitOfWork = performUnitWork(nextUnitOfWork)
    }
    if(!nextUnitOfWork){
        console.log('render阶段结束了')
    }
    // else{
          // 后面新增
        // requestIdleCallback(workLoop,{timeout: 1000});
    // }
}
function performUnitWork(fiber) {  // A1  B1 C1 C2
    beginWork(fiber)  // 处理此fiber
    if(fiber.child){  // 如果有儿子 返回大儿子
       return fiber.child
    }
    // 如果没有儿子，说明此fiber已经完成了
    while(fiber){
        completeUnitOfWork(fiber)
        if(fiber.sibling){
             return fiber.sibling  // 有弟弟找弟弟
        }
        fiber = fiber.return  // 找爹  
    }
}

function completeUnitOfWork(fiber){
    console.log('结束:'+fiber.key)     // A1 B1 C1 
}

function beginWork(fiber){
   console.log('开始:'+fiber.key)   // A1
}

nextUnitOfWork = rootFiber;
workLoop();
// window.requestIdleCallback(workLoop,{timeout: 1000});


// 图片tree.jpeg
// 开始:A1
// 开始:B1
// 开始:C1
// 结束:C1
// 开始:C2
// 结束:C2
// 结束:B1
// 开始:B2
// 结束:B2
// 结束:A1
// render阶段结束了