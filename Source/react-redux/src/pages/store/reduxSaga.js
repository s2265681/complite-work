import { call, put, takeEvery } from "../../use";
// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* fetchUser(action) {
  try {
    const user = yield call(() =>
      fetch("https://v1.hitokoto.cn/").then((response) => response.json())
    );
    // const user = { a: "11" };
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

/*
   在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
   允许并发（译注：即同时处理多个相同的 action）
 */
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
   也可以使用 takeLatest
 
   不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
   如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
   那么处理中的 action 会被取消，只会执行当前的
 */
//  function* mySaga() {
//    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
//  }
export function userReducer(
  state = {
    user: {},
  },
  action
) {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return { ...state, user: action.user };
    case "USER_FETCH_FAILED":
      return { ...state, user: { message: "error" } };
    default:
      return state;
  }
}

export default mySaga;
