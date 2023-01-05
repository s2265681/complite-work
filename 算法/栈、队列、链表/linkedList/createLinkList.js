function LinkNode(val) {
  this.val = val;
  this.next = null;
}

function LinkList() {
  this.head = null;
}

LinkList.prototype.add = function (value) {
  let node = new LinkNode(value);
  if (!this.head) {
    this.head = node;
  } else {
    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = node;
  }
  return this;
};

// const l1 = new LinkList();
// l1.add(1).add(2);
// console.log(l1);

module.exports = {
  LinkList,
  LinkNode,
};
