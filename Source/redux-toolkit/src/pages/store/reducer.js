const initialState = { value: 0, color: "red" };
export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "counter/incremented":
      return { ...state, value: state.value + 1 };
    case "counter/decremented":
      return { ...state, value: state.value - 1 };
    case "change/color":
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

export function todos(
  state = {
    key: [],
    id: 33,
  },
  action
) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, key: [...state.key, ...action.payload] };
    default:
      return state;
  }
}
