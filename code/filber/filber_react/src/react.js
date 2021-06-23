

/**
 * 
 * @param {*} type 
 * @param {*} config 
 * @param  {...any} children 
 */

import { ELEMENT_TEXT } from "./contends";

// 创建元素的方法
function createElement(type,config,...children){  // 1、 类型 2、 配置对象属性等 3、所有孩子
   delete config.__self;
   delete config.__source; // 表示这个元素是那行哪个文件生成的
   return {
       type,
       props:{
          ...config,  // 做一个兼容处理，如果是React元素，返回自己，如果是文本，返回元素对象
          children:children.map(child=>{
              return typeof child === 'object' ? child : {type: ELEMENT_TEXT,props:{text:child,children:[]}}
          })
       }
   }
}
const React = {
    createElement
}

export default React;