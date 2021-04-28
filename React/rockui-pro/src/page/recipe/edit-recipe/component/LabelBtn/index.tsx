import React,{useEffect} from 'react'
import {Button} from 'antd';
import './index.css'

interface Props{
    value?:number;
    onChange?:any
}

const LabelBtn:React.FC<Props>=(props)=>{
    console.log(props,'props');

    useEffect(() => {
        props.onChange([1])
    }, [])
    
    const triger = (e: number)=>{
        // props.onChange([1])
        props.onChange([1])
    }
    return (
        <div className="label-wrapper"> 
            <Button>热菜</Button>
        </div>
    )
}

export default LabelBtn;