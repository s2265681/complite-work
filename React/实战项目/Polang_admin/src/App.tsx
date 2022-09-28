import { Link } from "react-router-dom";
export default function App() {
  return (
    <>
      <h1>Hellow World</h1>
      <Link to={`/one`}>one</Link>
      <Link to={`/two`}>two</Link>
      <Link to={`/three`}>three</Link>
    </>
  );
}
