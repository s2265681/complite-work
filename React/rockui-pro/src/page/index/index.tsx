import React from 'react'
import {  Link } from "react-router-dom";
// import StartSpace from '../../components/StartSpace';
import { Bg } from 'rockui';

interface Props{
   name:string
}

const Index:React.FC<Props>=(props)=>{
    return (
        <div className="index_wrapper">
            <div className="text_wrapper">
                    hello，你来啦,
                     <br/>
                    <Link to="/home" className="into_text_color" >点击进入</Link>
            </div>
             <Bg type="start" animationType="down"/>
        </div>
    )
}

export default Index;