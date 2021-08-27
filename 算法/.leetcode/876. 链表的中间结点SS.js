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
// * 解法一： 数组法
// 链表的缺点在于不能通过下标访问对应的元素。因此我们可以考虑对链表进行遍历，同时将遍历到的元素依次放入数组 A 中。如果我们遍历到了 N 个元素，那么链表以及数组的长度也为 N，对应的中间节点即为 A[N/2]
 var middleNode = function(head) {
    let A = [head];
    while (A[A.length - 1].next != null)
      A.push(A[A.length - 1].next);
    return A[Math.trunc(A.length / 2)];
};

// * 解法二： 循环指针


//  * 解法三：快慢指针