import React, { useState, useEffect } from "react";
import { commissionData } from "./doc";
import DocTemplate from "../../../components/DocTemplate";
let title:string;
const Doc1: React.FC<any> = (props) => {
  // useEffect(()=>{
  //     title = commissionData[0].title||'文档1'
  //     commissionData[0].title = title
  //     localStorage.setItem("PLANDATA2",JSON.stringify(commissionData))
  //     // onchange(title)
  // },[])
  return (
    <DocTemplate
      title="文档1"
      localStr="PLANDATA2"
      commissionData={commissionData}
    />
  );
};

export default Doc1;
