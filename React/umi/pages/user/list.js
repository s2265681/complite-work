import React, { Component } from "react";
import { Link } from "umi";
export default class list extends Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
           <Link to={{ pathname: "/user/detail/1", state: { id: 1, name: "张三" } }}>张三 </Link>
        </li>
        <li className="list-group-item">
           <Link to={{ pathname: "/user/detail/2", state: { id: 2, name: "李四" } }}>李四 </Link>
        </li>
      </ul>
    );
  }
}
