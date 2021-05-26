import * as types from "../../action-types";
import { take,  put } from "redux-saga/effects";
export default function* (){
    console.log('开始执行conterSage')
    for(let i=0;i<3;i++){
        const action = yield take(types.ADD_ASYNC);
        console.log(action,'action1111111')
        yield put({type: types.ADD_ASYNC})
    }
    alert('最多执行三次')
}
