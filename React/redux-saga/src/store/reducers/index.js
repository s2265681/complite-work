import counter from './counter'
import { combineReducers } from 'redux'

/**
 * {
 *   counter1: { number1:0},
 *   counter1: { number2:0}
 * }
 */
// export default function(state={},action){
//   let nextState = {};
//   nextState.counter1 = counter1(state.counter1,action)
//   nextState.counter2 = counter2(state.counter2,action)
//   console.log(nextState,'nextState...object');
//   return nextState;
// }

let reducers = combineReducers({
    counter
})

export default reducers