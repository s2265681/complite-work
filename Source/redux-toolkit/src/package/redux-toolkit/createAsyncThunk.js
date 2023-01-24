import { createAction } from "redux-actions";
import { nanoid } from "nanoid";

// 构造一个对象包含 函数 + 状态对象， 默认执行 padding
function createAsyncThunk(typePrefix, payloadCreator, options) {
  const fulfilled = createAction(
    typePrefix + "/fulfilled",
    (payload, requestId, arg, meta) => ({
      payload,
      meta: {
        ...(meta || {}),
        arg,
        requestId,
        requestStatus: "fulfilled",
      },
    })
  );
  const pending = createAction(
    typePrefix + "/pending",
    (payload, requestId, arg, meta) => ({
      payload: undefined,
      meta: {
        ...(meta || {}),
        arg,
        requestId,
        requestStatus: "pending",
      },
    })
  );
  const rejected = createAction(
    typePrefix + "/rejected",
    (error, requestId, arg, meta, payload) => ({
      payload,
      error: error || "Rejected",
      meta: {
        ...(meta || {}),
        arg,
        requestId,
        rejectedWithValue: !!payload,
        requestStatus: "rejected",
        aborted: error?.name === "AbortError",
        condition: error?.name === "ConditionError",
      },
    })
  );

  function actionCreator(arg) {
    return (dispatch, getState, extra) => {
      const requestId = nanoid();
      const promise = (async function () {
        dispatch(
          pending(
            requestId,
            arg,
            options?.getPendingMeta?.({ requestId, arg }, { getState, extra })
          )
        );
      })();
      promise.requestId = requestId;
      promise.arg = arg;
      return promise;
    };
  }

  actionCreator.pending = pending;
  actionCreator.fulfilled = fulfilled;
  actionCreator.rejected = rejected;
  actionCreator.typePrefix = typePrefix;
  return actionCreator;
}

// function isThenable(value) {
//   return (
//     value !== null &&
//     typeof value === "object" &&
//     typeof value.then === "function"
//   );
// }

export default createAsyncThunk;
