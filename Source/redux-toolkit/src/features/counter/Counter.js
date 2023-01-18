import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../../package/react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter(props) {
  console.log(props, "props");
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  console.log(count, "count");
  console.log(dispatch, "dispatch");
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
