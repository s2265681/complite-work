
import { createStore } from './redux/index.js'

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
