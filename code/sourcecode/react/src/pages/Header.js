import React, { Component, useContext } from "react";
// import loginContext from "./useContext";
import "../App.css";

export default function Header(props) {
  // console.log(props, "props");
  const user = true
  // const { user, setUser } = useContext(loginContext);

  return (
    <div>
        <div className="header">{!user?'我是Header,您未登录，请回到Home页登录':user}</div>
        <div>{props.children}</div>
    </div>
  );
}

