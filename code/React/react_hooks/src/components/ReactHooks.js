import React, { useState } from "react";

function ReactHooks() {
  // const inputEl = useRef(null);
  const [value, setEveryValue] = useState({});
  const [values, setValue] = useState([]);

  function test(e) {
    console.log(e, "ee");
    // const {value} = inputEl.current;
    console.log(e.target.value);
    let { value } = e.target;
    setEveryValue({ value: value, compled: false });
    // inputEl.current.value = ''
  }

  function click() {
    console.log(value, "value");
    setValue([...values, value]);
    setEveryValue({ value: "" });
  }

  function toggleClick(idx) {
    var vas = values.map((e, i) =>
      idx === i ? { ...e, compled: !e.compled } : e
    );
    setValue(vas);
  }

  return (
    <div>
      react hooks
      <br />
      <p>{JSON.stringify(values)}</p>
      <ul>
        {values.map((el, idx) => (
          <li
            key={idx}
            style={{ color: el.compled ? "#f00" : "" }}
            onClick={() => toggleClick(idx)}
          >
            {el.value}
          </li>
        ))}
      </ul>
      <input value={value.value} onChange={e => test(e)} />
      <button onClick={() => click()}>add</button>
    </div>
  );
}

export default ReactHooks;
