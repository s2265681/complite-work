// 渲染  使用
function renderApp(state) {
  let title = document.querySelector("#title");
  let content = document.querySelector("#content");
  title.innerHTML = state.title.text;
  title.style.color = state.title.color;
  content.innerHTML = state.content.text;
  content.style.color = state.content.color;
}

// 常量 用的地方多 避免出错
const CHCNGETITLECOLOR = "CHCNGETITLECOLOR";
const CHCNGECONTENTCOLOR = "CHCNGECONTENTCOLOR";

let initState = {
  title: {
    color: "red",
    text: "标题",
  },
  content: {
    color: "green",
    text: "内容",
  },
};

// 管理员 接收老状态、动作 返回一个新状态  reducer 中的处理 每次都返回新对象 性能优化考虑
function reducer(state = initState, action) {
  switch (action.type) {
    case "CHCNGETITLECOLOR":
      //   state.title.color = action.color;
      return { ...state, title: { ...state.title, color: action.color } };
    case "CHCNGECONTENTCOLOR":
      return { ...state, content: { ...state.content, color: action.color } };
    default:
      return state;
  }
}

// 创建仓库，保护state  reducer 是保安 是处理器 由外部传入
function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    console.log(state, "??");
    return state;
  }
  // 想要修改状态，只能通过派发动作的方式  通过传入reducer 将动作写活 传入dispatch中调用 返回新的状态，进而修改仓库中的状态
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  }
  // 默认初始执行一下 更新一下状态的初始值
  dispatch({ type: "@@TYPE/REDUX_INIT" });
  // 发布订阅 用来自动渲染  不是必要的
  function subscribe(fn) {
    listeners.push(fn);
    // 取消订阅  返回一个函数让用户自己取消订阅
    return function () {
      listeners = listeners.filter((item) => item !== fn);
    };
  }
  return { getState, dispatch, subscribe };
}

let store = createStore(reducer);

function render() {
  renderApp(store.getState());
}

render();
let unsubscribe = store.subscribe(render)
console.log(unsubscribe,'unsubscribe')

setTimeout(() => {
  // 派发动作 修改状态
  store.dispatch({ type: CHCNGETITLECOLOR, color: "yellow" });
  unsubscribe()
  store.dispatch({ type: CHCNGECONTENTCOLOR, color: "orange" });
}, 1000);
