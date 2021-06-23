import React from 'react'
const Square =  React.memo(({n,increment}) =>  {
    return <button onClick={()=>increment(n)}>{n}</button>
})

export  default Square;