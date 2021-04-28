import React, { useState, useEffect } from "react";
import { Data } from "./data";
import DragSortCom from "../../../components/DragSortCom";

const Drag: React.FC<any> = (props) => {
  const [List, setList] = useState(Data);

  return (
    <div className="drag_wrapper">
      <h3>react实现拖拽排序组件《DragSortCom》</h3>
      <hr />
      <ul>
        {List.map((el, index) => (
          <li>
          <DragSortCom Data={List} key={el.id} index={index} setList={setList} lineHeight={40}>
            {el.id} —— {el.title}—— {el.content}
          </DragSortCom>
          </li>
        ))}
        </ul>
    </div>
  );
};

export default Drag;
