import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../../package/react-redux";
import { decrement, increment, fetchHitokoto } from "./counterSlice";

export function Counter(props) {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  console.log(counter.pending, "counter.pending");

  useEffect(() => {
    dispatch(fetchHitokoto());
  }, []);

  return (
    <div>
      <div>
        <h2> 一言： {counter.pending ? "loading..." : counter.hitokoto}</h2>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{counter.value}</span>
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
