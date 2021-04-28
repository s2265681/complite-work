import React,{useEffect,useState} from 'react'
import Nav from './Nav'
import  './index.css'

interface Props{}
const Layout:React.FC<Props>=(props)=>{
    const { location: { hash } } = window;
    const [isNav,setIsNav] = useState(false)
    useEffect(()=>{
        if(hash&&hash!=='#/'&&hash!=='#/resume/preview'){
            setIsNav(true)
        }
        window.addEventListener('hashchange',()=>{
            const { location: { hash } } = window;
            if(hash!=='#/'&&hash!=='#/resume/preview'){
                setIsNav(true)
            }else{
                setIsNav(false)
            }
        })
    })

    console.log(isNav,'isNav');
    return (
        <div className="layout">
            {isNav&&<Nav></Nav>}
            {props.children}
        </div>
    )
}

export default Layout;