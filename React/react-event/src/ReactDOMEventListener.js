import {getClosestInstanceFromNode,getFiberCurrentPropsFromNode} from './ReactDOMComponentTree';
import {dispatchEventForPluginEventSystem} from './DOMPluginEventSystem';
import {batchedEventUpdates} from './ReactDOMUpdateBatching';
/**
 *  执行真正派发逻辑
 * @param {*} domEventName 事件名 click
 * @param {*} eventSystemFlags 事件系统标识 0 4
 * @param {*} targetContainer 目标容器div#root
 * @param {*} nativeEvent 事件真正触发的时候，传递过来的原生浏览器事件对象
 */
export function dispatchEvent(domEventName,eventSystemFlags,targetContainer,nativeEvent) {
  //获取原生的事件源
  let nativeEventTarget = nativeEvent.target || nativeEvent.srcElement || window;
  //获取fiber实例
  let targetInst = getClosestInstanceFromNode(nativeEventTarget);
  //console.log('targetInst',targetInst);
  //let props = getFiberCurrentPropsFromNode(nativeEventTarget);
  //console.log('props',props);
  batchedEventUpdates(()=>{
    dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      targetInst,
      targetContainer,
    );
  });
  
}