import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const count = useSelector((state: any) => state.counter.value);
  return <>Hello</>;
}
