/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let curr = head;
  let prev = null;
  while (curr !== null) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  return prev;
};
