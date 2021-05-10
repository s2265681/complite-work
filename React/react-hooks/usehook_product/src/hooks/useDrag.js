import { useState,useEffect, useLayoutEffect, useRef } from 'react';
function useDrag(){
    // DOM位置 useRef 保存对象 可以在组件多次渲染的时候 保持不变
    const positionRef = useRef({
        currentX:0, 
        currentY:0,
        lastX:0,
        lastY:0
    })
    const domRef = useRef(null)  // domRef.current = div真是的DOM元素
    const [, forceUpdate ] = useState({})
    useLayoutEffect(() => { // 执行时机更早 想尽快的绑定事件 useEffect 什么时候绑定就不一定了
        let startX,startY; // 拖拽开始的x、y坐标
        const start = function(event){
            const { clientX, clientY } = event.targetTouches[0];
            startX = clientX;
            startY = clientY;
            domRef.current.addEventListener('touchmove',move)
            domRef.current.addEventListener('touchend',end)
        }
        const move = function(event){
            const { clientX , clientY } = event.targetTouches[0];
            positionRef.current.currentX = positionRef.current.lastX + (clientX - startX)
            positionRef.current.currentY = positionRef.current.lastY + (clientY - startY)
            forceUpdate({})
        }
        const end = function(){
            positionRef.current.lastX = positionRef.current.currentX
            positionRef.current.lastY = positionRef.current.currentY
            domRef.current.removeEventListener('touchmove',move)
            domRef.current.removeEventListener('touchend',end)
        }
        domRef.current.addEventListener('touchstart',start)
    }, [])
    // 让那个dom元素进行移动
    let style = {x: positionRef.current.currentX, y:positionRef.current.currentY}
    return [style,domRef]
}
export default useDrag;