

import { matchBracket } from './02-match-bracket'


describe('匹配括号', () => {
    it('正确的匹配情况', () => {
        const s1 = '(a{b[c(ddd)]d}f)'
        const res1 = matchBracket(s1)
        expect(res1).toBe(true)

        const s2 = '()'
        const res2 = matchBracket(s2)
        expect(res2).toBe(true)

        const s3 = '(撒[d])'
        const res3 = matchBracket(s3)
        expect(res3).toBe(true)

        const s4 = '(撒[d]){}()'
        const res4 = matchBracket(s4)
        expect(res4).toBe(true)
    })

    it('错误的匹配情况', () => {
        const s1 = '(a{b[c(ddd)]d}f))'
        const res1 = matchBracket(s1)
        expect(res1).toBe(false)

        const s2 = ''
        const res2 = matchBracket(s2)
        expect(res2).toBe(false)

        const s3 = '([)]{}'
        const res3 = matchBracket(s3)
        expect(res3).toBe(false)
    })
})