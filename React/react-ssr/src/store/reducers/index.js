import {combineReducers} from 'redux';
import counter from './counter';
import home from './home';

let reducers = combineReducers({
    counter,
    home
});
export default reducers;