import React,{useCallback} from "react";
import useForm from '../hooks/useForm'

function Form(){
    const [ formData, setFormValue, resetFormValues ] = useForm({username:'',email:''})
    const changeUsername =  useCallback((e)=>setFormValue('username',e.target.value),[setFormValue])
    const changeEmail =  useCallback((e)=>setFormValue('email',e.target.value),[setFormValue])
    return (
        <form>
            <div className="form-group">
               <label>用户名</label>
               <input className="form-control" placeholder="用户名"
                 value={formData.username}
                 onChange={changeUsername}
               />
            </div>
            <div className="form-group">
               <label>邮箱</label>
               <input className="form-control" placeholder="邮箱"
                 value={formData.email}
                 onChange={changeEmail}
               />
            </div>
            <button type="button" className="btn btn-primary" onClick={()=>console.log(formData)}>提交</button>
            <button type="button" className="btn btn-primary" onClick={()=>resetFormValues()}>重置</button>
        </form>
    )
}
export default Form;