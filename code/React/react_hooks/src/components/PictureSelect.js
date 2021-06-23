import React, { useEffect, useState } from "react";

function PictureSelect({ pictures=[], value=[], onChange }) {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (value.length === pictures.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [pictures]);

  // every
  function ereryChange(i) {
    if (value.includes(i)) {
      value.splice(
        value.findIndex(e => e === i),
        1
      );
    } else {
      value.push(i);
    }
    onChange(value.slice());
  }

  // all
  function allChoose() {
    console.log(isChecked, "isChecked");
    if (isChecked) {
      setChecked(false);
      onChange([]);
    } else {
      setChecked(true);
      let ids = [];
      pictures.map(e=>ids.push(e.id)) 
      onChange(ids);
    }
  }

  return (
    <div>
      <div>
        <label for="all" style={{cursor:'pointer'}}>全选</label>
        <input
          type="checkbox"
          id="all"
          checked={isChecked}
          onChange={() => {
            allChoose();
          }}
        />
        <span>已选择:{value&&value.length}个</span>
        <br />
      </div>
      {pictures.map((el, idx) => (
        <label for={idx}>
          <input
            type="checkbox"
            id={idx}
            checked={value&&value.includes(el.id)}
            key={idx}
            onChange={() => ereryChange(el.id)}
          />
          <img alt="" src={el.url} key={el.id} style={{cursor:'pointer'}}/>
        </label>
      ))}
    </div>
  );
}

export default PictureSelect;
