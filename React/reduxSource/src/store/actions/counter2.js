import * as types from '../../action-types'
export default {
  add: (args) => ({ type:types.ADD2, payload: args }),
  minus: (args) => ({ type:types.MINUS2, payload: args }),
};
