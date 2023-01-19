# 实现 redux-toolkit

-[文档](https://redux-toolkit.js.org/)

> Redux Toolkit 包旨在成为编写 Redux 逻辑的标准方式。它最初是为了帮助解决关于 Redux 的三个常见问题而创建的

- “配置 Redux store 太复杂了”
- “我必须添加很多包才能让 Redux 做任何有用的事情”
- “Redux 需要太多样板代码”

> “RTK 查询” redux Toolkit 还包括一个强大的数据获取和缓存功能

API

- configureStore(): 包装 createStore 以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供的任何 Redux 中间件，redux-thunk 默认包含，并启用 Redux DevTools Extension。
- createReducer()：这让你可以为 case reducer 函数提供一个动作类型的查找表，而不是编写 switch 语句。此外，它会自动使用该 immer 库让您使用普通的可变代码编写更简单的不可变更新，例如 state.todos[3].completed = true.
- createAction()：为给定的动作类型字符串生成一个动作创建者函数。函数本身已经 toString()定义，因此可以用它来代替类型常量。
- createSlice()：接受一个 reducer 函数对象，一个 slice 名称，一个初始状态值，自动生成一个 slice reducer，对应 action creators 和 action types。
- createAsyncThunk：接受一个动作类型字符串和一个返回承诺的函数，并生成一个 pending/fulfilled/rejected 基于该承诺分派动作类型的 thunk
- createEntityAdapter：生成一组可重用的 reducer 和 selectors 来管理 store 中的规范化数据
  Reselect 库中的 createSelector 实用程序，重新导出以便于使用。

# 目标

- 实现 configureStore ， 主要做了什么， 什么原理
- 实现 createSlice， 主要做了什么，原理
- 实现 react-redux useSelector, useDispatch, 新版是如何

- useSyncExternalStore 内部使用 useLayoutEffect 通过监听 forceUpdate({inst})
  [redux 源码分析](https://github.com/baozouai/redux-source-analysis/blob/main/src/packages/use-sync-external-store/src/useSyncExternalStoreClient.ts#L20)

- 实现 redux-devtool 是怎么工作的
