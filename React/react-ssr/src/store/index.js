import {createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

export function getClientStore(){
    return createStore(reducers,applyMiddleware(thunk,logger))
}

export function getServerStore(){
    return createStore(reducers,applyMiddleware(thunk,logger))
}