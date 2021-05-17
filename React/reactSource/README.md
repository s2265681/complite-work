







## 6、实现setState

#### src/index.js
```js

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    // console.log("componentDidMount");
    // setInterval(()=>{
    //     this.setState({ count: this.state.count+1 })
    // },2000)
  }
  shouldComponentUpdate(){
      return true
  }

  componentDidUpdate(){
      console.log('Count componentDidUpdate')
  }
  handleAddCount=()=> {
    this.setState({
      count: this.state.count+1
    });
  }
  render() {
      console.log(this,'this1')
    let p = React.createElement(
      "p",
      {  },
      this.props.name,
      this.state.count
    );
    let button = React.createElement(
      "button",
      {  id: "counter", onClick: this.handleAddCount },
      "+"
    );
    return React.createElement("div", {style:{color:this.state.count%2?'red':'orange'}}, p,button);
    // return this.state.count
  }
}
/*#__PURE__ 自定义组件*/
let element = React.createElement(Count, {
  name: "计数器",
});

React.render(element, document.getElementById("app"));

```

## 7、对比属性


## 8、对比资源少


## 9、获取补丁数组

#### 9-1、 src/index.js
```js
import React from "./react";
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      odd: true,
    };
  }
  componentDidMount() {
    this.setState({ odd: !this.state.odd });
  }

  render() {
    if (this.state.odd) {
      return React.createElement(
        "ul",
        { key: "wrapper" },
        React.createElement("li", { key: "A" }, "A"),
        React.createElement("li", { key: "B" }, "B"),
        React.createElement("li", { key: "C" }, "C")
      );
    }
    return React.createElement(
      "ul",
      { key: "wrapper" },
      React.createElement("li", { key: "A" }, "AI"),
      React.createElement("li", { key: "CI" }, "CI"),
      React.createElement("li", { key: "B" }, "BI"),
      React.createElement("li", { key: "E" }, "EI"),
      React.createElement("li", { key: "F" }, "FI")
    );
  }
}
let element = React.createElement(Count, {
  name: "计数器",
});

React.render(element, document.getElementById("app"));

```

#### 9-2、 src/react/unit.js




## 10、 打补丁
#### 10-1、src/index.js

#### 10-2、react/unit.js


## 11、 todos



## 10、 diff策略
#### tree diff
#### component diff
#### element diff
#### key
#### delegater