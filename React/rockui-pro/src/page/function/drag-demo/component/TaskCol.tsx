import React, { useState, useEffect, ReactChildren } from "react";
import { STATUS_CODE } from "../data";

interface Props {
  status: string;
  children: any;
  onDrop:(e: React.DragEvent<HTMLDivElement>)=>void;
}

const Index: React.FC<Props> = (props) => {
  const [entry, setEntry] = useState<boolean>(false);
  const { status, children } = props;
  const handleDrag=(e: React.DragEvent<HTMLDivElement>,status: boolean)=>{
    e.preventDefault();
    setEntry(status)
  }
  return (
    <div 
       id={`col-${status}`}
       key={status}
       className={"col"} 
       onDragEnter={(e)=>handleDrag(e,true)}
       onDragOver={(e)=>handleDrag(e,true)}
       onDragLeave={(e)=>handleDrag(e,false)}
       onDrop={e=>{props.onDrop(e);setEntry(false)}}
    >
      <header className="col-header">{STATUS_CODE[status]}</header>
      <div className={"col-main" + (entry ? " active" : "")}>{children}</div>
    </div>
  );
};

Index.defaultProps = {
  status: "STATUS_TODO",
};

export default Index;
