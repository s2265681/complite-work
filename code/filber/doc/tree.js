


/**
 * 1、filber 之前很饿吗养的，为什么需要fiber?
 * 2\看一下filber代码是怎么杨的
 * 这种遍历是一种递归调用，执行栈会越来越深，而且不能中断，中断后再想恢复就很难了
 * 不能中断，执行栈太深
 * 通过filber架构 filber是一个执行单元，
 * 
 */

 let root = {
     key:'A1',
     children:[{
         key:'B1',
         children:[
             {key:'C1',children:[]},
             {key:'C2',children:[]},
         ]
        },
        {
            key:'B2',children:[]
        }]
 }

 function walk(vdom){
     doWork(vdom);
     vdom.children.forEach(child => {
         walk(child)
     });
 }

 function doWork(vdom) {
     console.log(vdom.key)
 }

 walk(root)

// A1
// B1
// C1
// C2
// B2
