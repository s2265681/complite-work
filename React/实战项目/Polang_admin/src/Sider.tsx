import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sider() {
  const count = useSelector((state: any) => state.counter.value);
  return (
    <>
      <div id="slider">
        <h1>{`Hello world ${count}`}</h1>
        <Link to={`/one`}>one</Link> |<Link to={`/two`}>two</Link> |
        <Link to={`/three`}>three</Link>
      </div>
    </>
  );
}
