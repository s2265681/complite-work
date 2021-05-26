

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index'
import { all } from 'redux-saga/effects'
// const store = createStore(reducer);
// import createSagaMiddleware from 'redux-saga'

// import createSagaMiddleware from 'redux-saga'
import createSagaMiddleware from '../redux-saga/index'


import rootSaga from './saga/index';

const sagaMiddleware = createSagaMiddleware()

const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
sagaMiddleware.run(rootSaga);  // 内部实现了 co 会自动执行next

export default store