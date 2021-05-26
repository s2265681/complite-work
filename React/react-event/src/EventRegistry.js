export const allNativeEvents = new Set();
//export const registrationNameDependencies = {};
/**
 * onChange [ input,keydown,change]
 * 注册两个阶段事件
 * @param {*} registrationName 注册名称
 * @param {*} dependencies 依赖的事件
 */
export function registerTwoPhaseEvent(registrationName,dependencies){
    registerDirectEvent(registrationName,dependencies);//onClick
    registerDirectEvent(registrationName+"Capture",dependencies);//onClickCapture
}
export function registerDirectEvent(registrationName,dependencies){
    //registrationNameDependencies[registrationName]=dependencies;
    for(let i=0;i<dependencies.length;i++){//click dblclick
        allNativeEvents.add(dependencies[i]);
    }
}