/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-11-29 15:03:50
 */

const vnode = {
  tag: "DIV",
  children: [
    { tag: "SPAN", children: [] },
    {
      tag: "UL",
      children: [
        { tag: "LI", children: ['li1'] },
        { tag: "LI", children: [2222] },
      ],
    },
  ],
};

// 将上方的树结构对象转化为下面的DOM
// <div>
//     <span></span>
//     <ul>
//         <li></li>
//         <li></li>
//     </ul>
// </div>

function _render(vnode) {
  // 如果是数字类型转换为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子鼠族进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}
