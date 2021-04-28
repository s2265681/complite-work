import React from 'react'
import {Link } from "react-router-dom";
import BasicForm from './component/BasicForm'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

interface Props{
}

const tabs = [{
    tab:'基本信息',key:"1",disabled:false,content:<BasicForm/>
},{
    tab:'创建步骤',key:"2",disabled:false,content:'step'
}]

const EditRecipe:React.FC<Props>=(props)=>{

    return (
        <div className="wrapper"> 
             <h2 style={{margin:20}}>编辑食谱</h2>
             <Tabs defaultActiveKey="1">
                 {
                    tabs.map(item=><TabPane {...item}>{item.content}</TabPane>)
                 }
             </Tabs>
        </div>
    )
}

export default EditRecipe;