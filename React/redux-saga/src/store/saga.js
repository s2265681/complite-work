import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import * as types from "../action-types";

export function* helloSaga() {
  console.log("hello saga");
}

function delay(ms){
   return new Promise(function(resolve,reject){
       setTimeout(()=>{
           resolve('ok')
       },ms)
   })
}

export function* incrementAsync() {
  console.log("incrementAsync");
  // 当yield一个Promise的时候，会等待完成 resolve 后会给 msg 再进行接下来的操作 用genarate就是因为可以暂停等待 
//   console.log(delay(1000))
//   let msg =yield delay(1000)
  let msg =yield call(delay,1000)
  console.log(msg);
  yield put({type: types.ADD, payload:1})
}

export function* watchIncrementAsync() {
  console.log("watchIncrementAsync");
  // 没当yeild一个值，一般称为effect，就相当于告诉中间件进行某些处理
  // takeEvery 负责监听action动作
  yield takeEvery(types.ADD_ASYNC, incrementAsync);
}

export function* watchAndLog() {
   while(true){
       console.log('before action')
       let action = yield take('*');
       console.log('after action', action)
       let state = yield select(state => state.counter)
       console.log('state', state)
   }
  }
  

/**
 *  1、rootSaga 入门saga 组织和调用
 *  2、watch saga 监听到动作就回去worker去执行
 *  3、worker saga 真正干活的saga
 */
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchAndLog()]);
  console.log("next");
}
