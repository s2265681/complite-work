

export const createStore = (reducer)=>{
    let currentState = {};
    let observers = []

  
      // get 
      function getState(){
        return currentState;
     }


    // set    执行事件
    function dispatch(action){
        currentState = reducer(action,currentState)
        observers.forEach(fn=>fn())
    }

    // subscript  观察者
    function subscript(fn){
        observers.push(fn)
    }
    dispatch({type:'%rdtdt'})
    return { getState , dispatch , subscript}
}