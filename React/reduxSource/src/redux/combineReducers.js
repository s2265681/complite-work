// function combineReducers(reducers = {}) {
//   return function (state = {}, action) {
//     let newReducersObj = {};
//     // 对象 每个里面是一个函数
//     for (let key in reducers) {
//       newReducersObj[key] = reducers[key](state[key], action);
//     }
//     return newReducersObj;
//   };
// }
// export default combineReducers

function combineReducers(reducers = {}) {
  let reducerKeys = Object.keys(reducers); // [counter1,counter2]
  return function (state = {}, action) {
    let hasChange = false; // 状态是否修改
    let nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i]; // counter1
      const previousStateForKey = state[key]; // {number:0}
      const reducer = reducers[key]; // counter1
      let nextStateForKey = reducer(previousStateForKey, action); // {type:'ADD1'} {number:0}
      nextState[key] = nextStateForKey;
      hasChange = hasChange || nextStateForKey !== previousStateForKey;
    }
    return hasChange ? nextState : state;
  };
}

export default combineReducers;
