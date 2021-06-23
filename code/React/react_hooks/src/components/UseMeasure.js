// 使用useLayout和useRef测量元素数值的自定义钩子

import React,{useState,useLayoutEffect,useRef} from 'react'

export default function UseMeasure(deps) {
    const ref = useRef()
    const [react,setReact] = useState({})

    useLayoutEffect(()=>{
        console.log(ref.current.getBoundingClientRect(),'currenrt')
        setReact(ref.current&&ref.current.getBoundingClientRect())
      },deps)

      return [react ,ref ]


}
