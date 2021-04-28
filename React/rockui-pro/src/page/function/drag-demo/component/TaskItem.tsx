import React, { useState, useEffect } from "react";
interface Props {
  id:number;
  title:string;
  point:number;
  username:string;
  active?:boolean;
  handleDragStart:()=>void;
  onDragEnd:()=>void;
}
const Index: React.FC<Props> = (props) => {
  const {id,title,point,username,active,handleDragStart,onDragEnd} = props;
  return (
    <div
     id = {`item-${id}`}
     key = {`item-${id}`}
     className={'item'+(active?' active':'')}
     draggable="true"
     onDragStart={handleDragStart}
     onDragEnd={onDragEnd}
     >
        <header className="item-header">
           <span className="item-header-username">{username}</span>
           <span className="item-header-point">{point}</span>
        </header>
        <main className="item-main">{title}</main>
    </div>
  );
};

export default Index;
