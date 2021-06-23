import React,{useState,useEffect} from 'react'
import UseFetch from '../components/UseFetch'
// const {data,loading} = UseFetch('http://numbersapi.com/43/trivia')
export default function TestFetch() {
    const [count,setCount] = useState(()=>(JSON.parse(localStorage.getItem('count'))||1))
    const {data, loading} = UseFetch(`http://numbersapi.com/${count}/trivia`)
 
    useEffect(() => {
        localStorage.setItem('count',count)
        return () => {
           localStorage.removeItem('count')
        }
    }, [count])  

    console.log(data, loading,'data, loading')
    console.log(count,'count')
    return (
        <div>
            <button onClick={()=>setCount(c=>c+1)} style={{float:'left'}}>count+1</button>
             <div>测试接口{count} </div>            <br/>
             "http://numbersapi.com/{count}/trivia" <br/>
         
             "返回信息   <br/>
                <div>
                {!loading?data:'。。。loading'}
                </div>
              <br/>
        </div>
    )
}
