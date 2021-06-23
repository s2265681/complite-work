import React from 'react'
import useCountRenders from "../components/useCountRenders"
const Hello =  React.memo(({increment}) =>  {
    useCountRenders() // 计算render次数
    return <button onClick={()=>increment(1)}>Hello</button>
})

export  default Hello;