import React from 'react'
import '../App.css'
import {  Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="menu">
            <h3 style={{ width: 200 }}>导航</h3>
            <div class="dropdown" style={{ height: "50px", width: "200px" }}>
            <a class="dropdown-toggle" href="#">
              React 和周边主要原理探究
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <Link to="/">Home</Link>
                <Link to="/Reducer1">Reducer1</Link>
                <Link to="/Reducer2">Reducer2</Link>
              </li>
            </ul>
          </div>
        </div>
    )
}
