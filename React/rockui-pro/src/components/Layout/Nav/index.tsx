import React from 'react';
import './index.css';
import { Link } from 'react-router-dom'
interface Props{}
const Nav:React.FC<Props>=(props)=>{
    return (
        <div className="header"> 
           项目集
           <div className="nav">
              <Link to="/home">home</Link>
              <Link to="/uidoc">文档</Link>
              <Link to="/function">功能</Link>
              <Link to="/resume">简历</Link>
              <Link to="/recipe">食谱</Link>
              <Link to="/">退出</Link>
           </div>
        </div>
    )
}

export default Nav;