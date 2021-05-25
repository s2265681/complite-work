import $ from 'jquery';
import { createUnit } from './unit.js'
import { createElement } from './element';
import {Component} from './component';

let React = {
    render,
    createElement,
    Component
  };

  //
function render(element,container) {
    let  unit =  createUnit(element)  // 工厂方法 返回一个unit
    let markUp = unit.getHTMLString('0')  // 用来返回HTML标记
    $(container).html(markUp)     // 插入页面 之后进行触发
    $(document).trigger('mounted')
}


export default React;