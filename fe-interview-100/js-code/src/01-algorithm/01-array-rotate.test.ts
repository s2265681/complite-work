/**
 * @description Array rotate test
 * @author rockShang
 */

import { rotate1, rotate2 } from './01-array-rotate'

describe('数组旋转', () => {
    it('正常情况', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 3

        const res = rotate2(arr, k)
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4])
    })
    it('数组为空', () => {
        const res = rotate2([], 3)
        expect(res).toEqual([])
    })
    it('k 是负值', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = -3
        const res = rotate2(arr, k)
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4])
    })
    it('k 是0', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 0
        const res = rotate2(arr, k)
        expect(res).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
    it('k 不是数字', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 'abc'
        // @ts-ignore
        const res = rotate2(arr, k)
        expect(res).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
    it('k 的值大于数组长度', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 9
        // @ts-ignore
        const res = rotate2(arr, k)
        expect(res).toEqual([6, 7, 1, 2, 3, 4, 5])
    })

})