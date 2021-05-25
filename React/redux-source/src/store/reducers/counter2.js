import * as types from "../../action-types";
let initState = { number: 0 };
export default function (state = initState, actions) {
  switch (actions.type) {
    case types.ADD2:
      return { ...state, number: state.number + 1 };
    case types.MINU2:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
