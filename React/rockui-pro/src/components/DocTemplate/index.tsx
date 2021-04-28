import React, { useState, useEffect } from "react";
// import { commissionData } from "./doc";
import _ from "lodash";

// import "./index.css";
import { Animation, Commission } from "rockui";
interface Props {
  commissionData:any[],
  title:string,
  localStr:string
}

const UiDoc: React.FC<Props> = (props) => {
  let localdate: string = localStorage.getItem(props.localStr) || "";
  let localdateArr: Array<any> = (localdate && JSON.parse(localdate)) || [];
  let initDate =
    localdateArr.length !== 0 ? localdateArr : props.commissionData || [];
  const [planDate, setPlanDate] = useState(initDate);

  useEffect(() => {
    localStorage.setItem(props.localStr, JSON.stringify(planDate));
  }, [planDate]);

  return (
    <Animation>
      <div>
        <h3>{props.title}</h3>
        <div style={{ display: "flex" }}>
          <Commission
            dataSource={planDate}
            isHandle
            theme="info"
            onChange={(e, itemId, _newData) => {
              setPlanDate(_.cloneDeep(_newData));
            }}
            isEditable
          />
        </div>
      </div>
    </Animation>
  );
};

export default UiDoc;
