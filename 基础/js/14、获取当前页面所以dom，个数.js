// 方法一
const getPageTagsList = (root) => {
  let tagNumMap = {},
    nodes = [];
  function getChildrenNode(root) {
    [...root].map((el) => {
      if (el.children.length !== 0) {
        getChildrenNode(el.children);
      } else {
        tagNumMap[el.nodeName]
          ? (tagNumMap[el.nodeName] = tagNumMap[el.nodeName] + 1)
          : (tagNumMap[el.nodeName] = 1);
      }
    });
  }
  getChildrenNode(document.body.children);
  Object.keys(tagNumMap).map((el) => {
    nodes.push({ tag: el, num: tagNumMap[el] });
  });
  nodes.sort((a, b) => a.num - b.num);
  return nodes;
};

// 方法二
function getTag() {
  let elements = document.querySelectorAll("*");
  let counts = {};
  for (let item of elements) {
    let tagName = item.tagName;
    counts[tagName] = (counts[tagName] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.map((i) => i[0]);
}

getPageTagsList();
getTag();
