/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 * 解题思路，
 * 无法获取被删除的节点的上个节点
 * 方法是将要删除的节点转移到下个节点，
 * 让当前节点的值等于下个节点的值, 当前节点的指针，指向下下个节点
 * 这样就可以删除当前节点了
 * 输入：head = [4,5,1,9], node = 5
 * 输出：[4,1,9]
 * 解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
 */

const a = {
  val: 4,
};

const b = {
  val: 5,
};

const c = {
  val: 1,
};

const d = {
  val: 9,
};

a.next = b;
b.next = c;
c.next = d;
console.log(a);

var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
deleteNode(b);
console.log(a); //=> 4、 1、 9
