import React,{useState,useCallback} from 'react'
import Hello from "../components/Hello";
import Square from "../components/Square";

export default function UseCallBack() {
    const [count,setCount] = useState(0);
    let favoriteNums = [9,25,37];
    const increment = useCallback(
    (n=1)=>{
        setCount(c=> c + n)
    },[setCount])
    return (
        <div>
           UseCallBack 用来控制回调函数的更新，<br/>
           配合React.memo对子组件性能优化
           <div>
              <Hello increment={increment}/>
              <div>count: {count}</div>
              {favoriteNums.map((num,i)=><Square n={num} increment={increment}></Square>)}
           </div>
        </div>
    )
}
