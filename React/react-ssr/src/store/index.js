import {createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import ClientRequest from '../client/request'
import ServerRequest from '../server/request'

export function getClientStore(){
    let initState = window.context.state;
    return createStore(reducers,initState,applyMiddleware(thunk.withExtraArgument(ClientRequest),logger))
}

export function getServerStore(req){
    return createStore(reducers,applyMiddleware(thunk.withExtraArgument(ServerRequest(req)),logger))
}