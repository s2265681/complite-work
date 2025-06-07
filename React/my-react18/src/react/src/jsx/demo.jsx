

export const jsx = (type, config) => {
   const [state, setState] = useState(0)
   
  const checkIphone2 = ()=>{
    const ua = navigator.userAgent
    return /iphone|ipad|ipod|ios/.test(ua)
  }
   
  return (
    <>
    <div onClick={()=>{
        setState(state+1)
    }}>
        {state}
    </div>
    <div>
        {checkIphone2() ? 'iphone' : 'android'}    
    </div>
    </>
  )
}