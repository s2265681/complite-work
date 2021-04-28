import React from 'react'
interface IHello {
    msg?:string;
}
const HelloWorld: React.FunctionComponent<IHello>=(props) => {
    // props.children
    return (
        <div>
            <h2>{props.msg}</h2>
        </div>
    )
}
HelloWorld.defaultProps ={
    msg: "hi"
}
export default HelloWorld