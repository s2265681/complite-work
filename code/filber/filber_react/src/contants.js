

// 表示这个是文本元素
export const ELEMENT_TEXT = Symbol.for("ELEMENT_TEXT");
// React应用需要一个根Filber
export const TAG_ROOT = Symbol.for("TAG_ROOT");
// 原生的节点 span div p 函数组件 类组件
export const TAG_HOST = Symbol.for("TAG_HOST");
// 这是文本节点
export const TAG_TEXT = Symbol.for("TAG_TEXT");

// 增加节点
export const PLACEMENT = Symbol.for("PLACEMENT");

// 更新节点
export const UPDATE = Symbol.for("UPDATE");

// 删除节点
export const DELETION = Symbol.for("DELETION");

