import React,{useState,useLayoutEffect,useRef} from 'react'
import UseFetch from '../components/UseFetch'
import UseMeasure from '../components/UseMeasure'

export default function UseLayoutEffect() {
    const [count,setCount] = useState(()=>(JSON.parse(localStorage.getItem('count'))||1))
    const {data, loading} = UseFetch(`http://numbersapi.com/${count}/trivia`) 
    const [ react , divRef] = UseMeasure([])

    return (
        <div>
           UseLayoutEffect 计算元素尺寸，经常配合useRef使用
           <br/>
           <button onClick={()=>setCount(c=>c+1)} style={{float:'left'}}>count+1</button>
           <br/>
           <div style={{display:'flex'}}>
              <div ref={divRef}>
                 {!loading? JSON.stringify(data,null,2) :'。。。loading'}
               </div>
           </div>
           <pre style={{textAlign: 'left'}}>
              {JSON.stringify(react,null,2)}
           </pre>
        </div>
    )
}
