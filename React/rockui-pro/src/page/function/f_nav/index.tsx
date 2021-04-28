import React, { useState, useEffect } from "react";
import Dialog from '../../../components/Dialog'
interface Props { }

const Index: React.FC<Props> = (props) => {
    const [ visible , setVisible ] = useState(false)
    return (
        <div>
            nav导航<br/>
            <button onClick={()=>setVisible(true)}>点击Dialog打开</button>
            <Dialog title="标题" visible={visible} onCancle={()=> setVisible(false)}></Dialog>
        </div>
    );
};

export default Index;
