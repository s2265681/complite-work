// dom.ts
const $html: any = document.documentElement

export function outclick (elIds: string, callback) {
  'touchstart,click'.split(',').forEach(type => {
    $html.addEventListener(type, (e) => {
      const $els: any = Array.from(document.querySelectorAll(elIds))
      if (!$els.length) return
      let $target = e.target

      while ($target) {
        if ($els.includes($target)) return
        $target = $target['parentNode']
      }
      callback(e)
    }, false)
  })
}

// 获取 rect
export function getRect (el) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  if (el) {
    return el.getBoundingClientRect()
  }
  return {}
}