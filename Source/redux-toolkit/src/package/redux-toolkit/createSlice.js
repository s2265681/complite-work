import { useContext } from "react";

import { ReactReduxContext } from "../react-redux/Context";

function createSlice(sliceConfig) {
  const { name, reducers, initialState } = sliceConfig;
  console.log("createSlice", name, reducers, initialState);

  const actionH = (store) => {
    console.log(store, "store...");
    return {
      ...reducers,
    };
  };

  console.log(actionH, "actionH...");

  sliceConfig.actionH = actionH;

  sliceConfig.actions = {
    ...reducers,
  };

  return {
    reducer: sliceConfig,
    actions: sliceConfig.actions,
  };
}

export default createSlice;
