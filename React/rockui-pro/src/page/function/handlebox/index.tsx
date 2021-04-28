import React, { useState,useEffect } from "react";
import HandleBlock from "../../../components/HandleBlock";

interface Props{}

let localBlock = localStorage.getItem('block-demo')
let blockObj = localBlock && JSON.parse(localBlock)
const Index: React.FC<Props> = (props) => {
  const [block, setBlock] = useState( blockObj ||
    { 
    width: 200, height: 200,
    pointX : 300, pointY : 100
   });

  useEffect(()=>{
     localStorage.setItem('block-demo',JSON.stringify(block))
  },[block])

  const handleBlock=(info: any)=>{
    setBlock(info)
  }

  return (
    <div className="handle_box_wrapper">
      <HandleBlock
         blockInfo={
          block
         }
         onChange={handleBlock}
      />
    </div>
  );
};

export default Index;
