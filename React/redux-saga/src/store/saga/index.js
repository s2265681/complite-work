import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import * as types from "../../action-types";
import incrementAsync from './conterSage.js'

// export function* watchIncrementAsync() {
//   yield takeEvery(types.ADD_ASYNC, incrementAsync);
// }

export default function* rootSaga() {
  yield all([incrementAsync()]);
}
