import {reducer} from './reducer'
import {createStore} from './action'
export const store =  createStore(reducer)