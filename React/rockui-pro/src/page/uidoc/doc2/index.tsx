import React, { useState, useEffect } from "react";
import { commissionData } from "./doc";
import DocTemplate from '../../../components/DocTemplate';
interface Props {}

const Doc1: React.FC<Props> = (props) => {
  return (
    <DocTemplate 
       title="文档2"
       localStr="PLANDATA3"
       commissionData={commissionData}
    />
   
  );
};

export default Doc1;
