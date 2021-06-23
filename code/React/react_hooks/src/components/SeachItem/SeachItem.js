import React from 'react';
import {Card} from 'antd';
import './index.css'

const SeachItem = ({searchItem,initChoose,onChoose})=>{
      let keys = Object.keys(searchItem)
    return (
      <Card className="container">
        {
          keys.map((el,elI)=>{
             let label = searchItem[el].label;
             let datas =  searchItem[el].data;
            return (
              <ul >
                <span>{label}</span>
                {datas.map((d,idx)=>
                  <li 
                    key={idx} 
                    onClick={()=>onChoose(label,d.key,elI)}
                    style={{color: initChoose[elI]&&initChoose[elI].key===idx?'#f00':''}}
                    >
                     {d.label}
                  </li>)}
                <br/>
             </ul>
             )
          })
        }
      </Card>
    )
}

export default SeachItem;