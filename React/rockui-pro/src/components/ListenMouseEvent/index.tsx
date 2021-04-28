import React,{useState,useEffect} from 'react'
import './index.css'
import useListenMouse from '../../hooks/useListenMouse';
var time:any;
const ListenMouseEvent:React.FC =()=> {
     const [play,setPlay] =  useState(false)
    // const [position,setPosition] = useState({x:0,y:0});
    // const updateMouse =(e:MouseEvent)=>{
    //     setPlay(true)
    //      console.log('inner');
    //      setPosition({x:e.clientX,y:e.clientY-40})
    //      clearTimeout(time)
    //      time = setTimeout(()=>{
    //         setPlay(false)
    //     },1000)
    //  }
    //  useEffect(()=>{
    //      document.addEventListener('click',updateMouse)
    //      return ()=>{
    //          document.removeEventListener('click',updateMouse)
    //      }
    //  },[position])

    // 使用自定义的获取鼠标点击事件的hooks 传入一个事件函数，接受事件的触发
    const [position] = useListenMouse({x:0,y:0}, ()=>{
        console.log('接收事件');
        // 继续ui操作
        console.log(time,'time');
        clearTimeout(time)
        setPlay(true)
        time = setTimeout(()=>{
              setPlay(false)
              console.log('11');
          },1000)
    });
    
    
    console.log(position,'render');
    return (
        <div>
           <p>x:{position.x}</p>
           <p>y:{position.y}</p>
            {play&&<p  
                className="click_block"
                style={{left:position.x,top:position.y}}
                />}
        </div>
    )
}
export default ListenMouseEvent;