export default function createSagaMiddleware() {
  function sagaMiddleware({ dispatch, getState }) {
    //   console.log( dispatch, getState );
    console.log('执行');
    debugger
    function createChannel() {
      let observer = {};
      function subscribe(actionType, listener) {
        observer[actionType] = listener;
      }
      function publish(actionType) {
        if (observer[actionType]) {
          observer[actionType]();
          delete observer[actionType];
        }
      }
      return { subscribe, publish };
    }
    let { subscribe, publish } = createChannel();
    function run(generator) {
      //   console.log("开始执行这个generator", generator);
      let it = generator();
      function next(nextValue) {
        // value = {type="TAKE", actionType:ASYNC_INCREMENT}
        let { value: effect, done } = it.next(nextValue);
        if (!done) {
          switch (effect.type) {
            case "TAKE":
              subscribe(effect.actionType, next);
              break;
            case "PUT":
              dispatch(effect.action);
              next();
              break;
            default:
              break;
          }
        }
      }
    }
    sagaMiddleware.run = run;
    return function (next) {
      return function (action) {
        publish(action)
        next(action);
      };
    };
  }
  return sagaMiddleware;
}
