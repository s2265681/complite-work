// https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/
// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]
// 输入：head = [1,1,1,2,3]
// 输出：[2,3]
const { LinkList, ListNode } = require("./createLinkList");

var deleteDuplicates = function (head) {
  if (!head) return head;
  // 思路是 循环，当判断 cur.val === cur.next.val 再次向下遍历删除所有cur.val
  // 头节点可能删除， 所有增加一个哑节点， 从 cur.next.next 开始循环
  let dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let x = cur.next.val;
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};

const l1 = new LinkList();
l1.add(1).add(1).add(1).add(2).add(3);
// [1,2,3,3,4,4,5] => [1,2,5]
// [1,1,1,2,3] => [2,3]
// [1,2,3,3,4,4,5] => [1,2,5]
console.log(deleteDuplicates(l1.head));
