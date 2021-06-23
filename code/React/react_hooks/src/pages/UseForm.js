import React, { useState ,useContext} from "react";
import UseForm from "../components/UseForm";
import loginContext from "./useContext";

export default function State() {
  // const [value1,setValue1] = useState('')
  // const [value2,setValue2] = useState('')
  const [values, setValue] = UseForm({ username: "", password: "" });
  console.log(values, "values");

  const { user, setUser } = useContext(loginContext);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "30px" }}>
        <h2>React hooks封装useForm钩子</h2>
        <ul>
          <li>实现可复用的钩子组件</li>
          <li>简化表单可控数据获取流程</li>
          <li>
            封装前的使用useState <br />
            const [value1,setValue1] = useState('')
            <br />
            const [value2,setValue2] = useState('')
            <br />
            需要每一个input都去绑定value并且通过
            <br />
            onChange((e)=>setValue1(e.target.value) ····
          </li>
          <li>
            封装后使用useForm <br />
            const [values,setValue] = useState({`username:'',password:''`})
            <br />
            现在都可以通过onChange(e=>setValue(e))去更新最新的values
          </li>
          <li>
            <pre>
              {`const UseForm = initialValues =>  {
                const [values,setValues] = useState(initialValues)
                return  [ values, e=>{setValues({...values,
                    [e.target.name]:e.target.value
                })}]
                `}
            </pre>
          </li>
        </ul>
      </div>
      <div>
        <input
          type="text"
          name="username"
          value={values["username"]}
          placeholder="用户名"
          onChange={(e) => setValue(e)}
        ></input>
        <input
          type="password"
          name="password"
          value={values["password"]}
          placeholder="密码"
          onChange={(e) => setValue(e)}
        ></input>
        <br />
        <br />
        打印信息
        {JSON.stringify(values)}


        {user}
        {/*<input type="text" 
              name="username" 
              value={value1}
              placeholder="用户名"
              onChange={(e)=>setValue1(e.target.value)}>
            </input>
            <input type="password" 
              name="password" 
              value={value2}
              placeholder="密码"
              onChange={(e)=>setValue2(e.target.value)}>
             </input>*/}
      </div>
    </div>
  );
}
