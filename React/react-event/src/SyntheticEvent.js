function functionThatReturnsTrue(){
    return true;
}
function functionThatReturnsFalse(){
    return false;
}
function createSyntheticEvent(Interface) {
    function SyntheticBaseEvent(
        reactName,
        reactEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
        this._reactName = reactName;
        this._targetInst = targetInst;
        this.type = reactEventType;
        this.nativeEvent = nativeEvent;
        this.target = nativeEventTarget;
        this.currentTarget = null;//当前的事件源
        //选择性的把原生事件对象上的属性，拷贝到合成事件对象实例
        for(const propName in Interface){
            this[propName]=nativeEvent[propName];
        }
        this.isDefaultPrevented = functionThatReturnsFalse;//是否阻止了默认事件
        this.isPropagationStopped = functionThatReturnsFalse;//是否阻止冒泡了
        return this;
    }
    Object.assign(SyntheticBaseEvent.prototype,{
        preventDefault(){//做一个polyfill,兼容处理
            this.defaultPrevented = true;
            const event = this.nativeEvent;
            if(event.preventDefault){
                event.preventDefault();
            }else{//IE
                event.returnValue = false;
            }   
            this.isDefaultPrevented=functionThatReturnsTrue;
        },
        stopPropagation(){
            const event = this.nativeEvent;
            if(event.stopPropagation){
                event.stopPropagation();
            }else{//IE
                event.cancelBubble = true;
            }   
            this.isPropagationStopped=functionThatReturnsTrue;
        }
    });
    return SyntheticBaseEvent;
}

const MouseEventInterface = {
    clientX:0,
    clientY:0
}
export const SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
export const SyntheticEvent = createSyntheticEvent({});