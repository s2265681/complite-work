/**
 * 反转链表
 */

// 伪代码

// const n1 = {
//     value: 100,
//     next: n2
// }

// const n2 = {
//     value: 200,
//     next: n3,
//     prev: n1
// }
// const n3 = {
//     value: 300
//     prev: n2
// }

export interface ILinkListNode {
    value: number,
    next?: ILinkListNode
}

/**
 * 根据数组创建链表
 * @param arr 
 */
export function createLinkList(arr: number[]): ILinkListNode {
    const length = arr.length
    if (length === 0) throw new Error('arr is empty')

    let curNode: ILinkListNode = {
        value: arr[length - 1]
    }

    if (length === 1) return curNode

    for (let i = length - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        }
    }
    return curNode
}

/**
 * 反转单向链表，并返回反转之后的 head node
 * @param listNode list head node
 * @returns 
 */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
    // 定义了三个指针，整体后移
    let prevNode: ILinkListNode | undefined = undefined
    let curNode: ILinkListNode | undefined = undefined
    let nextNode: ILinkListNode | undefined = listNode
    // 以nextNode为开始
    while (nextNode) {
        if (curNode && !prevNode) {
            // 说明是在第一个节点处， 删去当前节点的指针，因为第一个节点反转后，到最后一个位置，是没有next的
            // 第一个元素 删掉next 防止循环引用
            delete curNode.next
        }
        // 反转指针
        if (curNode && nextNode) {
            curNode.next = prevNode
        }
        // 最前面开始 整体后移
        prevNode = curNode
        curNode = nextNode
        nextNode = nextNode?.next
    }
    // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next
    curNode!.next = prevNode

    return curNode!
}

console.log(createLinkList([100, 200, 300]), '11')

let n = createLinkList([100, 200, 300])
console.log(reverseLinkList(n), '22')