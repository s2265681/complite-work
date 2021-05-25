import * as types from '../../action-types'
export default {
  add: (args) => ({ type:types.ADD, payload: args }),
  minus: (args) => ({ type:types.MINU, payload: args }),
};
