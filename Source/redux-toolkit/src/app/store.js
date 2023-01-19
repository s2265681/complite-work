import counterReducer from "../features/counter/counterSlice";
// import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from "../package/redux-toolkit";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
