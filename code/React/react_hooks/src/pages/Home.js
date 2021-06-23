import React, { useContext } from "react";
// const context = useContext(contextValue)
import loginContext from "./useContext";
const Home = () => {
  // const [user,setUser] =
  const { user, setUser } = useContext(loginContext);
  const handleUser = (txt)=>{
    sessionStorage['user'] = txt
    setUser(txt)
    if(!txt) sessionStorage['user'] =''
  }
  return (
    <div>
      react hooks， 点击tab切换页面
      <div>
        {!user ? (
          <button onClick={()=>handleUser("你好，你已登陆")}>
            登录 <br />
          </button>
        ) : (
          <>
            user: {user}
            <br />
            <button onClick={()=>handleUser("")}>
              注销
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
