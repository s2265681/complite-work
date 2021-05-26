import * as types from "../../action-types";
let initState = { number: 0 };
export default function (state = initState, actions) {
  console.log(actions, "actions...");
  switch (actions.type) {
    case types.ADD:
      return { ...state, number: state.number + actions.payload };
    case types.MINU:
      return { ...state, number: state.number - actions.payload };
    case types.ADD_ASYNC:
      return { ...state, number: state.number + 1};
    default:
      return state;
  }
}
