
import { useState,useEffect, useLayoutEffect } from 'react';
function useForm(initialValues){
    const [formData,setFormData] = useState(initialValues)
    const setFormValue = (key,value)=>{
        setFormData({...initialValues,[key]:value})
    }
    const resetFormValue = ()=>{
        setFormData(initialValues)
    }
    return [formData, setFormValue,resetFormValue]
}
export default useForm;