// https://leetcode.cn/problems/merge-two-sorted-lists/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const { LinkList, ListNode } = require("./createLinkList");

// 法一： 递归
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  }
  if (list1.val >= list2.val) {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};

// 法二： 引入虚拟头节点
var mergeTwoLists2 = function (list1, list2) {
  const dummy = new ListNode(-1);
  let cur = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 ? list1 : list2;
  return dummy.next;
};

const l1 = new LinkList();
l1.add(1).add(2).add(4);
const l2 = new LinkList();
l2.add(1).add(3).add(4);

console.log(mergeTwoLists2(l1.head, l2.head)); // [1,1,2,3,4,4]
