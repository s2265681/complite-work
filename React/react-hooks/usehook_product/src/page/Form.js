import React from "react";
import ReactDOM from "react-dom";
import { useState,useEffect, useLayoutEffect } from 'react';
function Form(){
    const [ formData, setFormValue, resetFormValues ] = useForm({username:'',email:''})
    return (
        <form>
            <div className="form-group">
               <label>用户名</label>
               <input className="form-control" placeholder="用户名"
                 value={formData.username}
                 onChange={setFormValue()}
               />
            </div>
            <div className="form-group">
               <label>邮箱</label>
               <input className="form-control" placeholder="邮箱"
                 value={formData.email}
                 onChange={setFormValue()}
               />
            </div>
            <button type="button" className="btn btn-primary" onClick={()=>console.log(formData)}>提交</button>
            <button type="button" className="btn btn-primary" onClick={()=>resetFormValues()}>重置</button>
        </form>
    )
}
export default Form;