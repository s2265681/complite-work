import React, { useState, useEffect } from "react";
import { commissionData } from "./doc";
import DocTemplate from '../../../components/DocTemplate';
interface Props {}

const Doc1: React.FC<Props> = (props) => {
  return (
    <DocTemplate 
       title="rockUi文档"
       localStr="PLANDATA1"
       commissionData={commissionData}
    />
   
  );
};

export default Doc1;
