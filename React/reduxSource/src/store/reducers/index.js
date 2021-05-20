import counter1 from './counter1'
import counter2 from './counter2'
import { combineReducers } from '../../redux/index'

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
    counter1,
    counter2
})

console.log(reducers,'reducers....');
export default reducers