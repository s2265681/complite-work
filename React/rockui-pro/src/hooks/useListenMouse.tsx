import {useState,useEffect} from 'react'

interface IProps{
    x:number;
    y: number;
}

const useListenMouse =(payload:IProps,Fn:()=>void):any[]=> {
    const [position,setPosition] = useState(payload);
    const updateMouse =(e:MouseEvent)=>{
         setPosition({x:e.clientX,y:e.clientY-40})
         Fn()
     }
     useEffect(()=>{
         document.addEventListener('click',updateMouse)
         return ()=>{
             document.removeEventListener('click',updateMouse)
         }
     },[position])
     
     return [position]
}
export default useListenMouse;