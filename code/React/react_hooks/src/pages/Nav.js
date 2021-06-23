import React from 'react'
import '../App.css'
import {  Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="menu">
            <h3 style={{ width: 200 }}>导航</h3>
            <div className="dropdown" style={{ height: "50px", width: "200px" }}>
            <a className="dropdown-toggle" href="#">
                React Hooks 仿 Antd
            </a>
            <ul className="dropdown-menu">
                <li className="dropdown-item">
                <Link to="/RTable">RTable组件</Link>
                <Link to="/RSpider">轮播图组件</Link>
                </li>
            </ul>
            </div>
            <div class="dropdown" style={{ height: "50px", width: "200px" }}>
            <a class="dropdown-toggle" href="#">
              React Hooks
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <Link to="/">Home</Link>
              </li>
              <li class="dropdown-item">
              <Link to="/UseForm">UseForm</Link>
               </li>
               <li class="dropdown-item">
              <Link to="/UseFetch">UseFetch</Link>
               </li>
               <li class="dropdown-item">
               <Link to="/UseLayoutEffect">UseLayoutEffect</Link>
               </li>
               <li class="dropdown-item">
               <Link to="/UseCallBack">UseCallBack</Link>
               </li>
              <li class="dropdown-item">
                <Link to="/ReactHooks">ReactHooks</Link>
              </li>
              <li class="dropdown-item">
                <Link to="/HookUseReducer1">HookUseReducer1</Link>
              </li>
              <li class="dropdown-item">
                <Link to="/HookUseReducer2">HookUseReducer2</Link>
              </li>
              <li class="dropdown-item">
                <Link to="/picture">picture</Link>
              </li>
              <li class="dropdown-item">
                <Link to="/itemIndex">itemIndex</Link>
              </li>
            </ul>
          </div>
        </div>
    )
}
