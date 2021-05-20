import * as types from '../../action-types'
export default {
  add: (args) => ({ type:types.ADD1, payload: args }),
  minus: (args) => ({ type:types.MINUS1, payload: args }),
};
