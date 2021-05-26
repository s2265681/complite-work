
import {registerTwoPhaseEvent} from './EventRegistry';
//i是原生事件 i+1是React事件
const discreteEventPairsForSimpleEventPlugin = [
    'click', 'click',
    'dblclick', 'doubleClick'
]
export const  topLevelEventsToReactNames = new Map();

export function registerSimpleEvents() {
  for(let i=0;i<discreteEventPairsForSimpleEventPlugin.length;i+=2){
      let topEvent = discreteEventPairsForSimpleEventPlugin[i];//dblclick
      const event = discreteEventPairsForSimpleEventPlugin[i+1];//doubleClick
      const capitalizedEvent = event[0].toUpperCase()+event.slice(1);//click=>Click doubleClick DoubleClick
      const reactName = 'on'+capitalizedEvent;//Click=>onClick DoubleClick=>onDoubleClick
      topLevelEventsToReactNames.set(topEvent,reactName);//click=>onClick 
      registerTwoPhaseEvent(reactName,[topEvent]);
  }
}