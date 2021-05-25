

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index'
// const store = createStore(reducer);
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()

const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
sagaMiddleware.run(rootSaga);  // 内部实现了 co 会自动执行next

export default store