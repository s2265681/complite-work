
/**
 * 两个栈实现一个队列
 * API add delete length
 */

export class MyQueue {
    private stack1: number[] = []
    private stack2: number[] = []
    add(n: number) {
        this.stack1.push(n)
    }
    delete(): number | null {
        // stack1 中的元素都放到 stack2中
        let res
        const stack1 = this.stack1
        const stack2 = this.stack2

        while (stack1.length) {
            const n = stack1.pop()
            if (n !== null) {
                stack2.push(n!)
            }
        }

        res = stack2.pop()

        while (stack2.length) {
            const n = stack2.pop()
            if (n !== null) {
                stack1.push(n!)
            }
        }
        return res!
    }
    get length(): number {
        return this.stack1.length
    }
}

let queue = new MyQueue()
// 入队
queue.add(100)
queue.add(200)
queue.add(300)
console.log(queue.length) // 3
// 出队
console.log(queue.delete()) // 100
console.log(queue.length) // 2

console.log(queue.delete()) // 200
console.log(queue.length) // 1

