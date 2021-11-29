/**
 * @description:
 * @param {*}
 * @return {*}
 * @Date: 2021-11-29 14:49:26
 * @author: rockshang
 */
{
  /* 
  <div>
    <span></span>
    <ul>
        <li></li>
        <li></li>
    </ul>
</div>

将上方的DOM转化为下面的树结构对象

{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
} */
}

function dom2tree(dom) {
  const obj = {};
  obj.tag = dom.tagName;
  obj.children = [];
  dom.childNodes.forEach((child) => obj.children.push(dom2tree(child)));
  return obj
}
