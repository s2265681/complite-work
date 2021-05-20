

import { createStore } from '../redux/index';
import reducer from './reducers/index'
const store = createStore(reducer);
export default store