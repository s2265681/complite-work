源码： https://github.com/facebook/react/blob/v0.11.2/src/core/ReactMultiChild.js

## 6、实现 setState

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
  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    console.log("Count componentDidUpdate");
  }
  handleAddCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    console.log(this, "this1");
    let p = React.createElement("p", {}, this.props.name, this.state.count);
    let button = React.createElement(
      "button",
      { id: "counter", onClick: this.handleAddCount },
      "+"
    );
    return React.createElement(
      "div",
      { style: { color: this.state.count % 2 ? "red" : "orange" } },
      p,
      button
    );
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
    setTimeout(() => {
      this.setState({ odd: !this.state.odd });
    }, 1000);
  }

  render() {
    console.log(this.state.odd, "this.state.odd");
    if (this.state.odd) {
      return React.createElement(
        "ul",
        { key: "wrapper" },
        React.createElement("li", { key: "A" }, "A"),
        React.createElement("li", { key: "B" }, "B"),
        React.createElement("li", { key: "C" }, "C"),
        React.createElement("li", { key: "D" }, "D")
      );
    }
    return React.createElement(
      "ul",
      { key: "wrapper" },
      React.createElement("li", { key: "A" }, "A1"),
      React.createElement("li", { key: "C" }, "C1"),
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

#### 9-2、 src/unit.js

```js
import types from './types'
//... function diff
 diff(diffQueue, newChildrenElements) {
      debugger
    // let oldChildrenElement = this._currentElement.props.children;
    let oldChildrenUnitMap = this.getOldChildrenMap(this._renderedChildrenUnites);
    // 先找老得集合里看看有没有能用的， 有就复用，没有就创建新的
    let {newChildrenUnitMap , newChildrenUnits } = this.getNewChildren(oldChildrenUnitMap,newChildrenElements);

    let lastIndex = 0; // 一个已经确定位置的索引
    for (let i=0;i< newChildrenUnits.length; i++) {
        let newUnit = newChildrenUnits[i];
        // 第一个拿到的就是newKey=A
        let newKey = (newUnit._currentElement.props &&  newUnit._currentElement.props.key) || i.toString();
        let oldChildUnit = oldChildrenUnitMap[newKey]
        if(oldChildUnit === newUnit){  // 如果说新老一致说明复用了老节点
            if(oldChildUnit._mountIndex < lastIndex){
                diffQueue.push({
                    parentId: this._reactid,
                    parentNode: $(`[data-reactid="${this._reactid}"]`),
                    type:types.MOVE,
                    fromIndex:oldChildUnit._mountIndex,
                    toIndex: i
                })
            }
            lastIndex = Math.max(lastIndex,oldChildUnit._mountIndex)
        }else{
           // 两个不相等
           diffQueue.push({
            parentId: this._reactid,
            parentNode: $(`[data-reactid="${this._reactid}"]`),
            type:types.INSERT,
            toIndex: i,
            markUp:newUnit.getHTMLString(`${this._reactid}.${i}`)
           })
        }
        newUnit._mountIndex = i;
    }

    for (let oldKey in oldChildrenUnitMap) {
        let oldChild = oldChildrenUnitMap[oldKey];
        // 老得key在新的key中没有的话标记删除
       if(!newChildrenUnitMap.hasOwnProperty(oldKey)){
        diffQueue.push({
            parentId: this._reactid,
            parentNode: $(`[data-reactid="${this._reactid}"]`),
            type:types.REMOVE,
            fromIndex: oldChild._mountIndex
        })
       }
    }
  }
```

#### 9-3、src/types.js

```js
export default {
  MOVE: "MOVE",
  INSERT: "INSERT",
  REMOVE: "REMOVE",
};
```

#### result

```js
<!--
0: {parentId: "0", parentNode: jQuery.fn.init(1), type: "MOVE", fromIndex: 1, toIndex: 2}
1: {parentId: "0", parentNode: jQuery.fn.init(1), type: "INSERT", toIndex: 3, markUp: "<li data-reactid="0.3" key="E" ><span data-reactid="0.3.0">EI</span></li>"}
2: {parentId: "0", parentNode: jQuery.fn.init(1), type: "INSERT", toIndex: 4, markUp: "<li data-reactid="0.4" key="F" ><span data-reactid="0.4.0">FI</span></li>"}
3: {parentId: "0", parentNode: jQuery.fn.init(1), type: "REMOVE", fromIndex: 3}
-->
```

## 10、 打补丁

#### 10-1、src/index.js

>  通过打布丁比对新旧节点， 完成差异部分的更新，减少DOM操作，优化
```js
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      odd: true,
    };
  }
  componentDidMount() {
    setTimeout(()=>{
        this.setState({ odd: !this.state.odd });
     },1000)
  }

  render() {
      console.log(this.state.odd,'this.state.odd');
    if (this.state.odd) {
      return React.createElement(
        "ul",
        { key: "wrapper" },
        React.createElement("li", { key: "A" }, "A"),
        React.createElement("li", { key: "B" }, "B"),
        React.createElement("li", { key: "C" }, "C"),
        React.createElement("li", { key: "D" }, "D")
      );
    }
    return React.createElement(
      "ul",
      { key: "wrapper" },
      React.createElement("li", { key: "A" }, "A1"),
      React.createElement("li", { key: "C" }, "C1"),
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

#### 10-2、react/unit.js

```js
// 通过打布丁比对新旧节点， 完成差异部分的更新，减少DOM操作，优化
  patch(diffQueue){
    debugger
     let deleteChildren = []; // 删除的所有节点
     let deleteMap = {}; // 这里暂存能复用的节点
     for(let i=0;i<diffQueue.length;i++){
         let difference = diffQueue[i];
         if(difference.type === types.MOVE || difference.type === types.REMOVE){
             let fromIndex = difference.fromIndex;
             let oldChild = $(difference.parentNode.children().get(fromIndex)); // 某一个儿子元素
              deleteMap[fromIndex] = oldChild
              deleteChildren.push(oldChild)
         }
     }
     // 删除
     $.each(deleteChildren,(idx,item)=>$(item).remove())
     // 插入
     for(let i=0;i<diffQueue.length;i++){
         let difference = diffQueue[i];
             switch(difference.type){
                case types.INSERT:
                    this.insertChildAt(difference.parentNode,difference.toIndex,$(difference.markUp))
                    break;
                case types.MOVE:
                    this.insertChildAt(difference.parentNode,difference.toIndex,deleteMap[difference.fromIndex] )
                    break;
                default:
                    break;
             }
     }
  }

  // function diff add  >>>>
  if(oldChildUnit){ // 如果老得元素有要删除
        diffQueue.push({
            parentId: this._reactid,
            parentNode: $(`[data-reactid="${this._reactid}"]`),
            type:types.REMOVE,
            toIndex: oldChildUnit._mountIndex
            })
        $(document).undelegate(`.${oldChildUnit._reactid}`)
    }
 // >>>>>
```


## 11、 todos

## 10、 diff 策略

#### tree diff

#### component diff

#### element diff

#### key

#### delegater
