import {useState,useEffect} from 'react'
import axios from 'axios';

const useURLLoader = (url:string,deps:any[]=[])=>{
    const [data,setDate]= useState<any>(null)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get(url).then(result=>{
            setDate(result.data)
            setLoading(false)
        })
    },deps)

    return [data,loading]
}

export default useURLLoader;