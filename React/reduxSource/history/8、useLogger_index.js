import React from "react";
import ReactDOM from "react-dom";

import { widthLogger } from './components/Logger'

class Hello extends React.Component{
    render(){
        return <div>Hello</div>
    }
}
Hello = widthLogger(Hello)

ReactDOM.render(<Hello/>,document.getElementById("root"));
