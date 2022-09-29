import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../store/counterSlice";
import { Trans } from "react-i18next";

export default function One() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <Trans>content.One</Trans>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        <Trans>content.Increment</Trans>
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        <Trans>content.Decrement</Trans>
      </button>
    </>
  );
}
