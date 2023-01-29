/**
 * 生产消费者函数
 * @author lianxc
 * @return {oject} {take, put} 生成者和消费者
 */
function channel() {
  let _task = null;
  function take(task) {
    _task = task;
  }
  function put(action) {
    const { type, ...args } = action;
    if (!_task) {
      return;
    }
    _task.signal === type && _task.callback(args);
  }
  return {
    take,
    put,
  };
}

export default channel();
