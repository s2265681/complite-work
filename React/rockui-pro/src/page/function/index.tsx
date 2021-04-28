import React, { useState, useEffect, useContext,createContext } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import _ from "lodash";
import F_nav from "./f_nav";
import Drag from "./drag";
import DragDemo from "./drag-demo";
import moveBox from "./handlebox";
import { Menu } from "rockui";


const { MenuItem, SubMenu } = Menu;

interface Props {}

const Index: React.FC<Props> = (props) => {
  return (
    <div className="function_wrapper">
      <div className="left_menu">
        <Menu
          mode="vertical"
          defaultIndex={"0"}
          onSelect={(index) => console.log(index)}
        >
          <MenuItem key={1}>
            <Link to="/function/">
              <div>导航</div>
            </Link>
          </MenuItem>

          <MenuItem key={2}>
            <Link to="/function/drag">
              <div>拖拽</div>
            </Link>
          </MenuItem>
          <MenuItem key={3}>
            <Link to="/function/drag-demo">
              <div>拖拽demo</div>
            </Link>
          </MenuItem>
          <MenuItem key={4}>
          <Link to="/function/handlebox">
            <div>操作盒子</div>
          </Link>
        </MenuItem>
        </Menu>
      </div>

      <div className="right_menu">
        <Router>
          <Route path="/function" exact component={F_nav}></Route>
          <Route path="/function/drag" component={Drag}></Route>
          <Route path="/function/drag-demo" component={DragDemo}></Route>
          <Route path="/function/handlebox" component={moveBox}></Route>

        </Router>
      </div>
    </div>
  );
};

export default Index;
