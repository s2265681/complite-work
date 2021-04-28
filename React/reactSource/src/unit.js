import { Element, createElement } from "./element";
import $ from "jquery";
let diffQueue; // 差异队列
let updateDepth=0; // 更新的级别

// 父类
class Unit {
  constructor(element) {
    // 凡是挂在到私有属性上的都以_开头
    this._currentElement = element;
  }
  getHTMLString() {
    throw Error("此方法不能被调用");
  }
}

// 返回一个用span包裹的数字或者文字
class TextUnit extends Unit {
  getHTMLString(reactid) {
    this._reactid = reactid;
    return `<span data-reactid="${reactid}">${this._currentElement}</span>`;
  }
  update(nextElement) {
    if (this._currentElement !== nextElement) {
      this._currentElement = nextElement;
      $(`[data-reactid=${this._reactid}]`).html(this._currentElement);
    }
  }
}
// 处理原生DOM元素 将虚拟DOM ：
// {type:'button',props:{id:'sayHello'}} => 转换成元素字符串返回
// “<button id="sayHello" style="color:red;"><span>say</span><b>hello</></button>”
class NativeUnit extends Unit {
  getHTMLString(reactid) {
    this._reactid = reactid;
    let { type, props } = this._currentElement;
    let tagStart = `<${type} data-reactid="${this._reactid}"`;
    let childString = "";
    let tagEnd = `</${type}>`;
    this._renderedChildrenUnites = [];
    //{id:'sayHello', style:{color:'red'},onClick:sayHello}
    for (const propName in props) {
      if (Object.hasOwnProperty.call(props, propName)) {
        if (/^on[A-Z]/.test(propName)) {
          // 处理绑定⌚事件 onClick:sayHello => click="" 通过delegate绑定到document上，利用事件冒泡 hasClass 的机制找到我们要触发的类
          let eventName = propName.slice(2).toLowerCase(); // click
          $(document).delegate(
            `[data-reactid="${this._reactid}"]`,
            `${eventName}.${this.reactid}`,
            props[propName]
          );
          //   tagStart+= (`${eventName}="${props[propName].name}"`)
        } else if (propName === "style") {
          // 处理样式 style:{color:'red', backgroundColor:'#f00'} => style="color = #f00"
          let styleObj = props[propName];
          let styles = Object.entries(styleObj)
            .map(([attr, value]) => {
              return `${attr.replace(
                /[A-Z]/g,
                (m) => `-${m.toLowerCase()}`
              )}:${value}`;
            })
            .join(";");
          tagStart += ` style="${styles}" `;
        } else if (propName === "className") {
          // 处理类名 className => class
          tagStart += ` class="${props[propName]}" `;
        } else if (propName === "children") {
          // 处理孩子
          let children = props[propName];
          // eslint-disable-next-line no-loop-func
          children.forEach((child, index) => {
            let childUnit = createUnit(child); // 可能是字符串也可能是一个react元素 虚拟DOM
            this._renderedChildrenUnites.push(childUnit)
            let childHTMLString = childUnit.getHTMLString(
              `${this._reactid}.${index}`
            );
            childString += childHTMLString;
          });
        } else {
          tagStart += ` ${propName}="${props[propName]}" `;
        }
      }
    }
    tagStart = tagStart + ">" + childString + tagEnd; // <button  id=sayHello ></button>
    return tagStart;
  }
  update(nextElement) {
      // 1、更新属性
    let oldProps = this._currentElement.props;
    let newProps = nextElement.props;
    this.updateDOMProperties(oldProps,newProps)
    this.updateDOMChildren(nextElement.props.children)
  }
  // 此处要把新的儿子门传过来，然后老得儿子们进行对比，然后找出差异，进行修改DOM
  updateDOMChildren(newChildrenElements){
      this.diff(diffQueue,newChildrenElements)
  }
  diff(diffQueue,newChildrenElements){
    // let oldChildrenElement = this._currentElement.props.children;
    let oldChildrenUnitMap = this.getOldChildrenMap(this._renderedChildrenUnites)
    console.log(oldChildrenUnitMap,'oldChildrenUnitMap')
    // console.log(oldChildrenElement,'oldChildrenElement.')
    // console.log(this._renderedChildrenUnites,'_renderedChildrenUnites.')

    // 先找老得集合里看看有没有能用的， 有就复用，没有就创建新的
    let newChildren = this.getNewChildren(oldChildrenUnitMap,newChildrenElements)
  }
  // 构建新的数组
  getNewChildren(oldChildrenUnitMap,newChildrenElements){
      let newChildren = [];
      newChildrenElements.forEach((newElement,index)=>{
          let newKey =  (newElement.props &&  newElement.props.key) || index.toString();
          let oldUnit = oldChildrenUnitMap[newKey]; // 找到老得unit
          let oldElement = oldUnit&&oldUnit._currentElement;  // 获取老元素
          if(shouldDeepCompare(oldElement,newElement)){
               oldUnit.update(newElement); // 递归操作 
               newChildren.push(oldUnit)
          }else{
               // 不一样 推倒重来
               let nextUnit = createUnit(newElement);
               newChildren.push(nextUnit)
          }
      })
      return newChildren;
  }
  getOldChildrenMap(childrenUnits=[]){
      let map = {};
      for(let i =0;i<childrenUnits.length;i++){
          let unit = childrenUnits[i]._currentElement;
          let key = (unit.props &&  unit.props.key) || i.toString();
          map[key] = unit;
      }
      return map
  }
  updateDOMProperties(oldProps,newProps){
     // 循环
     let propName;
     for(propName in oldProps){  // 循环老得属性集合, 看一下新的属性中是否包含此属性
         if(!newProps.hasOwnProperty(propName)){
             // 不包含删除属性
             $(`[data-reactid="${this._reactid}"]`).removeAttr(propName)
         }
         // 如果是绑定的事件， 解除委托的事件绑定
         if(/on[A-Z].test(propName)/){
             $(document).undelegate(`.${this._reactid}`);
         }
         for (const propName in newProps) {
             if(propName=='children'){
                 continue
             }else  if(/on[A-Z]/.test(propName)){
                let eventName = propName.slice(2).toLowerCase(); // click
                $(document).delegate(
                  `[data-reactid="${this._reactid}"]`,
                  `${eventName}.${this.reactid}`,
                  newProps[propName]
                );
             }else if(propName == 'style'){
                 // 直接修改掉样式属性
                 let styleObj = newProps['style'];
                 Object.entries(styleObj).map(([attr,value])=>{
                     $(`[data-reactid="${this._reactid}"]`).css(attr,value)
                 })
             }else if(propName=='className'){
                //  $(`[data-reactid="${this._reactid}"]`)[0].className = newProps[propName]
                $(`[data-reactid="${this._reactid}"]`).attr('class',newProps[propName]) 
             }else{
                 // 直接改掉属性
                 $(`[data-reactid="${this._reactid}"]`).newProps(propName,newProps[propName])
             }
         }
     }
  }
}

// 处理自定义组件compositeUnit
class compositeUnit extends Unit {
  // 这里负责处理组件的更新操作
  update(nextElement, partialState) {
    // debugger
    // console.log(nextElement, partialState, "newEle,newState");
    // 现货渠道新的元素
    this._currentElement = nextElement || this._currentElement;
    // 获取老得状态
    let nextState = (this._compositeInstance.state = Object.assign(
      this._compositeInstance.state,
      partialState
    ));
    console.log(nextState, "nextState....");
    // 新的属性对象
    let nextProps = this._currentElement.props;
    // 判断 shouldComponentUpdate
    let c =
      this._compositeInstance.shouldComponentUpdate &&
      !this._compositeInstance.shouldComponentUpdate(nextProps,nextState);
    if (c) {
      return;
    }
    // 比较更新 先得到上次渲染的单元
    let preRenderUnitInstance = this._renderedUnitInstance;
    // 得到上次渲染的元素
    let preRenderedElement = preRenderUnitInstance._currentElement;
    // 新的元素 =>  再次调用render 拿
    let nextRenderElement = this._compositeInstance.render();

    // 判断是不是深度比较  如果两个元素类型一样  才可以进行深度比较， 如果不一样 直接干掉老得元素 新建新的元素
    if (shouldDeepCompare(preRenderedElement, nextRenderElement)) {
      // 如果新旧两个元素一样进行深度比较 把更新的工作交给上次渲染的
      preRenderUnitInstance.update(nextRenderElement);
      this._compositeInstance.componentDidUpdate && this._compositeInstance.componentDidUpdate();
      // this._compositeInstance
    } else {
      // 不深比较 就是直接替换...  创建一个新的原色
      this._renderedUnitInstance = createUnit(nextRenderElement); // 得到一个新的HTMLString
      let nextHTMLString = this._renderedUnitInstance.getHTMLString();
      $(`[data-reactid="${this._reactid}"]`).replaceWith(nextHTMLString);
    }
  }
  getHTMLString(reactid) {
    this._reactid = reactid;
    let { type: Component, props } = this._currentElement;
    let compositeInstance = (this._compositeInstance = new Component(props));
    // 让组件的实力的currentUnit属性等于当前的unit
    compositeInstance._currentUnit = this;
    // 如果有组件有渲染的函数的话让他执行
    compositeInstance.componentWillMount &&
      compositeInstance.componentWillMount();
    // 调用组件的render方法，或得要渲染的元素
    let renderedElement = compositeInstance.render();
    // 得到这个原色对应的unit
    let renderedUnitInstance = (this._renderedUnitInstance = createUnit(
      renderedElement
    ));
    // 通过unit可以或得他的html 标记markup
    let renderedHTMLString = renderedUnitInstance.getHTMLString(this._reactid);
    // 给document绑定事件 当mounted的时候执行
    $(document).on("mounted", () => {
      compositeInstance.componentDidMount &&
        compositeInstance.componentDidMount();
    });
    return renderedHTMLString;
  }
}

// createUnit 是一个创建不同对象的工厂函数 根据不同的条件返回不同的类对象
function createUnit(element) {
  if (typeof element === "string" || typeof element === "number") {
    return new TextUnit(element);
  } else if (element instanceof Element && typeof element.type === "string") {
    return new NativeUnit(element); // return  <button id="sayHello" style="color:red;"><span>say</span><b>hello</></button>
  } else if (element instanceof Element && typeof element.type === "function") {
    return new compositeUnit(element);
  }
}
// 深比较
function shouldDeepCompare(oldElement,newElement) {
// 先判断类型
if(oldElement!==null && newElement!==null){
    let oldType = typeof oldElement;
    let newType = typeof newElement;
    if((oldType==='string'||oldType==='number')&&(newType==='string'||newType==='number')){
        return true
    }
    if(oldElement instanceof Element && newElement instanceof Element){
        return oldElement.type == newElement.type
    }
}
return false
}

export { createUnit };
