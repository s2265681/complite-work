import { createAction } from "redux-actions";
function createAsyncThunk(type, thunkReducer) {
  let status = {
    pending: type + "/pending",
    fulfilled: type + "/fulfilled",
    rejected: type + "/rejected",
  };
  function innerReducer(state, action) {
    console.log(type, "type...", status);
    thunkReducer().then((res) => {
      console.log(res, "res...");
    });
    return createAction(status["pending"]);
  }
  innerReducer.pending = status["pending"];
  innerReducer.fulfilled = status["fulfilled"];
  innerReducer.rejected = status["rejected"];
  return innerReducer;
}

export default createAsyncThunk;
