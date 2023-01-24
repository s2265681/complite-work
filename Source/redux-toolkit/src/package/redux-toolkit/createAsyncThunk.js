import { createAction } from "./createAction";
import { nanoid } from "nanoid";

// 构造一个对象包含 函数 + 状态对象， 默认执行 padding
const createAsyncThunk = (() => {
  function createAsyncThunk(typePrefix, payloadCreator, options) {
    // 此处为自定义 createAction
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
      (requestId, arg, meta) => ({
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
      (error, requestId, arg, payload, meta) => ({
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
      //  返回给 thunk 中间件 使用   If this "action" is really a function, call it and return the result.
      return (dispatch, getState, extra) => {
        const requestId = nanoid();

        // async await 同步执行 通过 finalAction  取得最终结果 再次 dispatch
        const promise = (async function () {
          let finalAction = undefined;
          dispatch(
            pending(
              requestId,
              arg,
              options?.getPendingMeta?.({ requestId, arg }, { getState, extra })
            )
          );
          try {
            finalAction = await Promise.race([
              Promise.resolve(
                payloadCreator(arg, {
                  dispatch,
                  getState,
                  extra,
                  requestId,
                })
              ).then((result) => {
                return fulfilled(result, requestId, arg);
              }),
            ]);
          } catch (err) {
            finalAction = rejected(err, requestId, arg);
          }
          const skipDispatch =
            options &&
            !options.dispatchConditionRejection &&
            rejected.match(finalAction);

          if (!skipDispatch) {
            // 发送最终结果
            dispatch(finalAction);
          }
          return finalAction;
        })();

        promise.requestId = requestId;
        promise.arg = arg;
        return promise;
      };
    }
    // 返回actionCreator函数与状态action
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      typePrefix,
    });
  }
  createAsyncThunk.withTypes = () => createAsyncThunk;
  return createAsyncThunk;
})();
export default createAsyncThunk;
