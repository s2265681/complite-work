
import { allNativeEvents } from './EventRegistry';
import * as SimpleEventPlugin from './SimpleEventPlugin';
import { getEventListenerSet } from './ReactDOMComponentTree';
import { IS_CAPTURE_PHASE } from './EventSystemFlags';
import { addEventCaptureListener, addEventBubbleListener } from './EventListener';
import { dispatchEvent } from './ReactDOMEventListener';
import { HostComponent } from './ReactWorkTags';
import getListener from './getListener';
//注册事件名称，核心作用是给allNativeEvents赋值
SimpleEventPlugin.registerEvents();
/**
 * 监听所有的绑定的插件
 */
export const nonDelegatedEvents = new Set(['scroll']);//不需要监听 冒泡阶段
export function listenToAllSupportedEvents(container) {
    //事件插件注册完了以后，会在此进行循环绑定事件处理函数到容器container上
    allNativeEvents.forEach(domEventName => {
        if (!nonDelegatedEvents.has(domEventName)) {
            //监听container的冒泡阶段domEventName(click)事件,
            listenToNativeEvent(domEventName, false, container);
        }
        listenToNativeEvent(domEventName, true, container);
    });
}
function listenToNativeEvent(domEventName, isCapturePhaseListener,
    rootContainerElement, eventSystemFlags = 0) {
    //同一个容器上的同一个阶段的同一个事件只绑定一次
    let listenerSet = getEventListenerSet(rootContainerElement);
    let listenerSetKey = getListenerSetKey(domEventName, isCapturePhaseListener);
    if (!listenerSet.has(listenerSetKey)) {
        if (isCapturePhaseListener) {
            eventSystemFlags |= IS_CAPTURE_PHASE;// let a=1;a+=2;
        }
        addTrappedEventListener(
            rootContainerElement,
            domEventName,
            eventSystemFlags,
            isCapturePhaseListener
        );
        listenerSet.add(listenerSetKey);
    }
}

function addTrappedEventListener(rootContainerElement, domEventName,
    eventSystemFlags, isCapturePhaseListener) {
    let listener = dispatchEvent.bind(null, domEventName, eventSystemFlags, rootContainerElement);
    if (isCapturePhaseListener) {
        addEventCaptureListener(rootContainerElement, domEventName, listener);
    } else {
        addEventBubbleListener(rootContainerElement, domEventName, listener);
    }
}
function getListenerSetKey(domEventName, isCapturePhaseListener) {
    //click__capture click__bubble
    return `${domEventName}__${isCapturePhaseListener ? 'capture' : 'bubble'}`;
}

export function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags,
    nativeEvent, targetInst, targetContainer) {
    let nativeEventTarget = nativeEvent.target;
    const dispatchQueue = [];
    SimpleEventPlugin.extractEvents(//由插件来提取事件处理函数
        dispatchQueue,//由插件来填充这个dispatchQueue数组
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget,
        eventSystemFlags,
        targetContainer
    );
    processDispatchQueue(dispatchQueue, eventSystemFlags);
}

function processDispatchQueue(dispatchQueue, eventSystemFlags){
    let isCapturePhase = (eventSystemFlags&IS_CAPTURE_PHASE)!==0;
    for(let i=0;i<dispatchQueue.length;i++){
        const {event,listeners} = dispatchQueue[i];
        processDispatchQueueItemsInOrder(event,listeners,isCapturePhase);
    }
}
function processDispatchQueueItemsInOrder(event,listeners,isCapturePhase){
    if(isCapturePhase){
        for(let i=listeners.length-1;i>=0;i--){
            const {currentTarget,listener} = listeners[i];
            if(event.isPropagationStopped()){
                return;
            }
            execDispatch(event,listener,currentTarget); 
        }
    }else{
        for(let i=0;i<listeners.length;i++){
            const {currentTarget,listener} = listeners[i];
            if(event.isPropagationStopped()){
                return;
            }
            execDispatch(event,listener,currentTarget); 
        }
    }
}
function execDispatch(event,listener,currentTarget){
    event.currentTarget=currentTarget;
    listener(event);
    event.currentTarget=null;
}
export function accumulateSinglePhaseListeners(targetFiber, reactName, nativeType, inCapturePhase) {
    let captureName = reactName + 'Capture';//onClickCapture
    let reactEventName = inCapturePhase ? captureName : reactName;//onClick
    let listeners = [];
    let instance = targetFiber;
    let lastHostComponent = null;
    while (instance) {
        const { stateNode, tag } = instance;
        if (tag === HostComponent && stateNode !== null) {
            lastHostComponent = stateNode;
            const listener = getListener(instance, reactEventName);
            if (listener) {
                listeners.push(createDispatchListener(instance, listener, lastHostComponent));
            }
        }
        instance = instance.return;
    }
    return listeners;
}
function createDispatchListener(instance, listener, currentTarget){
  return  {instance,listener,currentTarget};
}