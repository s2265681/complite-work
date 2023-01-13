/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const { LinkList, ListNode } = require("./createLinkList");
var deleteDuplicates = function (head) {
  // 当前节点的值等于下个节点的值，就删除下个节点值
  let p = head;
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};
// 解释： 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
// 例子  head = [1,1,2]  =>  输出：[1,2]
// head = [1,1,2,3,3] => [1,2,3]

// 思路： 遍历 每一个val 存一下， 下次再遇到就跳过
const l1 = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 2,
        next: {
          val: 3,
          next: {
            val: 3,
            next: null,
          },
        },
      },
    },
  },
};
const l2 = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 1,
      next: null,
    },
  },
};

const l3 = {};
console.log(deleteDuplicates(l1));
