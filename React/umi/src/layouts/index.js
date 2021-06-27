import React, { Component } from "react";
import { Link } from "umi"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Layout extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              UMI
            </a> 
          </div>
          <ul className="nav navbar-nav">
            <li className="nav-link"><Link to="/">首页</Link></li>
            <li className="nav-link"><Link to="/user">用户管理</Link></li>
            <li className="nav-link"><Link to="/profile">个人中心</Link></li>
            <li className="nav-link"><Link to="/user/AsyncList">异步的用户列表</Link></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
             {this.props.children}
          </div>
        </div>
      </div>
      </>
    );
  }
}
