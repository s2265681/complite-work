import * as types from "../../action-types";
let initState = { number: 0 };
export default function (state = initState, actions) {
  switch (actions.type) {
    case types.ADD1:
      return { ...state, number: state.number + actions.payload };
    case types.MINU1:
      return { ...state, number: state.number - actions.payload };
    default:
      return state;
  }
}
