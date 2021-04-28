// security.ts
/**
 * 解析字符串
 */
export function decode(s) {
  try {
    s = decodeURIComponent(s)
  } catch (e) { }
  return s
}

export const encode = encodeURIComponent

/**
 * 解析 query
 */
let cache = {}
export function qsParse(query = location.search): any {
  if (cache[query]) return cache[query]

  let params = {}
  query = query.replace(/^\?/, '')
  const queryArr = query.split('&')
  const len = queryArr.length
  for (let i = 0; i < len; i++) {
    let [k, v] = queryArr[i].split('=')
    k && (params[decode(k)] = decode(v || ''))
  }
  cache[query] = params
  return params
}

/**
 * object 反序列化成 string
 */
export function qsStringify(o): string {
  let s: string[] = []
  for (let i in o) {
    s.push(`${i}=${encode(o[i])}`)
  }
  return s.join('&')
}

/**
 * 安全
 */

export function escapeHtml(s) {
  return s.replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2f;')
}

export function escapeJs(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/</g, '\\74')
    .replace(/>/g, '\\76')
    .replace(/\//g, '\\/')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\v/g, '\\v')
    .replace(/\b/g, '\\b')
    .replace(/\0/g, '\\0')
}