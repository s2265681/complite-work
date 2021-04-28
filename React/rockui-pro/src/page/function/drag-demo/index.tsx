import React, { useState, useEffect } from "react";
import { tasks, STATUS_CODE } from "./data";
import TaskCol from './component/TaskCol'
import TaskItem from './component/TaskItem'
interface Props {}
const Index: React.FC<Props> = (props) => {
  const [activeId,setActiveId] = useState<number>(-1)
  const handleDrop=(e: React.DragEvent<HTMLDivElement>,status: string)=>{
    e.preventDefault()
    tasks.filter(t=>t.id === activeId)[0]['status'] = status
  }
  return (
    <div className="task-wrapper">
      {Object.keys(STATUS_CODE).map((status) => (
        <TaskCol 
          status={status} 
          key={status}
          onDrop={e=>handleDrop(e,status)}
        >
          {tasks
            .filter((t) => t.status === status)
            .map((t) => (
              <TaskItem
                key={t.id}
                active ={t.id===activeId}
                id={t.id}
                title={t.title}
                point={t.point}
                username={t.username}
                handleDragStart={()=>setActiveId(t.id)}
                onDragEnd={()=>setActiveId(-1)}
              />
            ))}
        </TaskCol>
      ))}
    </div>
  );
};

export default Index;
