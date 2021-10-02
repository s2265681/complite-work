// 运用链表指针获取JSON的节点值

const json = {
  a: {
    b: {
      c: 1,
    },
  },
  d: {
    e: 2,
  },
};

// const path = ['a','b','c']
const path = ["d", "e"];

let p = json;
path.forEach((k) => {
  p = p[k];
  //   console.log(p);
});
