class Element {
  constructor(type, props) {
    this.type = type;
    this.props = props;
  }
}

function createElement(type, props, ...children) {
  props = props || {};
  props.children = children || []; // children 也是props的属性
  return new Element(type, props); // 这里面放着类型和属性 这就是虚拟DOM
}

export { Element, createElement };
