import React from 'react';
interface Props {
  title?: String,
  visible?: Boolean,
  onCancle?: Function,
  onOk?: Function
}
const Dialog: React.FC<Props> = ({title,visible,onCancle,onOk}) => {
   return visible ? <div className="dialog_container">
       <div className="title">{title}</div>
       <div className="btns">
           <button className="ok" onClick={()=>{ onOk&&onOk() }}>确定</button>
           <button className="cancle" onClick={()=>{ onCancle&&onCancle() }}>取消</button>
       </div>
   </div> : <></>
}
export default Dialog