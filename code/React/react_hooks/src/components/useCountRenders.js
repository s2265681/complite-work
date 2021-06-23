import React,{useRef} from 'react'

export default function useCountReaders() {
    const renders = useRef(0);
    console.log('renders:' , renders.current++)
}
