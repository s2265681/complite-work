import React from "react";
import useRequest from '../hooks/useRequest'
const URL = 'http://localhost:8000/api/users'
/*
*  useRequest 自定义Hook 用来请求远程接口
* @params url String
* @return Array [data,options,setOptions] 
*/
export default function(){
  const [data,options,setOptions] = useRequest(URL);
  // 当前页 总页数 本页数组
  const { currentPage, totalPage,list } = data;
  console.log(data,'data');
  
  return (
    <>
       <table>
          <thead><tr><td>ID</td><td>NAME</td></tr></thead>
          <tbody>
             {
               list.map(item=>(
                  <tr key={item.id}>
                       <td>{item.id}</td>
                       <td>{item.name}</td>
                  </tr>
               ))
             }
          </tbody>
       </table>
       <nav>
            <ul className='pagination'>
            {
              new Array(totalPage).fill(0).map((item,index)=>(
                <li key={index}><button 
                    onClick={()=>setOptions({...options,currentPage:index+1})}
                    className='btn btn-primary'
                >{index+1}</button></li>
              ))
            } 
            </ul>
       </nav>
    </>
  )
}