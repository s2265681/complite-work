function createChannel() {
  let observer = {};
  function subscribe(actionType,listener) {
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
let { subscribe,publish } = createChannel();

subscribe("ASYNC_INCREMENT",()=>{console.log('ASYNC_INCREMENT')})
publish("ASYNC_INCREMENT");
// publish("ASYNC_INCREMENT");
