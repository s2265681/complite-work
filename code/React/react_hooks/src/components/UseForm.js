import React,{useState} from 'react'

 const UseForm = initialValues =>  {
    const [values,setValues] = useState(initialValues)
    return  [
        values,
        e=>{
            setValues({
                // 内部将传入的values值修改覆盖
                ...values,
                [e.target.name]:e.target.value
            })
        }
    ]
}

export default UseForm;
