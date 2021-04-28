import React,{useState,useEffect,useRef} from 'react'

const LikeBtn:React.FC =()=> {
    let [like,setLike] = useState(0);
    let [isUp,setIsUp] = useState(true);

    let likeRef = useRef(0)
    let didMuntRef = useRef(false)
    // 访问dom节点 监听事件
    const domRef = useRef<HTMLInputElement>(null)
    // {current:0}
    // ref在不同渲染中拿到的是最终的值
    useEffect(()=>{
       console.log('document title is running');
       document.title = `点赞了${like}次`
    },[like,isUp])

    useEffect(()=>{
        if(didMuntRef.current){
            console.log('this is updated');
        }else{
            didMuntRef.current = true
        }
    })

    useEffect(()=>{
        if(domRef&&domRef.current){
            domRef.current.focus()
            // console.log('this is updated');
        }else{
            // domRef.current = true
            
        }
    })

    const alertCount=()=>{
       setTimeout(()=>{
          alert(like)
       },3000)
    }

    const alertRefCount=()=>{
        setTimeout(()=>{
           alert(likeRef.current)
        },3000)
     }
 
    return (
        <div>
            <input type="text" ref={domRef}></input>
            <button onClick={()=>{setLike(++like); likeRef.current++}}>点赞{like}👍</button><br/>
            <button onClick={()=>setIsUp(!isUp)}>{isUp?'On':'Off'}</button><br/>
            <button onClick={()=>alertCount()}>Alert</button><br/>
            <button onClick={()=>alertRefCount()}>RefAlert</button>
        </div>
    )
}
export default LikeBtn;