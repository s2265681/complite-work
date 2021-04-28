import React, { useState, useEffect, useContext,createContext } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import _ from "lodash";
import RockUi from "./doc_rockui";
import Doc1 from "./doc1";
import Doc2 from "./doc2";
import { Menu } from "rockui";

const { MenuItem, SubMenu } = Menu;

interface Props {}

const UiDoc: React.FC<Props> = (props) => {
  // localStorage.setItem("PLANDATA2",JSON.stringify(commissionData))
  return (
    <div className="uidoc_wrapper">
      <div className="left_menu">
        <Menu
          mode="vertical"
          defaultIndex={"0"}
          onSelect={(index) => console.log(index)}
        >
          <MenuItem key={1}>
            <Link to="/uidoc/">
              <div>RockUi</div>
            </Link>
          </MenuItem>

          <MenuItem key={2}>
            <Link to="/uidoc/doc1">
              <div>文档1</div>
            </Link>
          </MenuItem>
          <MenuItem key={3}>
            <Link to="/uidoc/doc2">
              <div>文档2</div>
            </Link>
          </MenuItem>
        </Menu>
      </div>

      <div className="right_menu">
        <Router>
          <Route path="/uidoc" exact component={RockUi}></Route>
          <Route path="/uidoc/doc1" component={Doc1}></Route>
          <Route path="/uidoc/doc2" component={Doc2}></Route>
        </Router>
      </div>
    </div>
  );
};

export default UiDoc;
