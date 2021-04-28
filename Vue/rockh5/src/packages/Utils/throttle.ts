
// 节流函数，指定时间执行一次
export type Procedure = (...args: any[]) => void
export type Options = {
  leading?: Boolean,
  trailing?: Boolean
}

// 节流函数 制定间隔执行
export function throttle<F extends Procedure> (
  fn: F,
  wait: number = 100,
  options: Options = {}
) {
  let timeout
  let context
  let args
  let result
  let previous: number = 0

  const later = function () {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = fn.apply(context, args)
    if (!timeout) context = args = null
  }
  const throttled: any = function (this: any) {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = fn.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

// 防抖函数，到达指定时间间隔执行
export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  isImmediate: boolean = false
): F {
  let timeoutId: number | undefined | any

  return function(this: any, ...args: any[]) {
    const context = this

    const doLater = function() {
      timeoutId = undefined
      if (!isImmediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = isImmediate && timeoutId === undefined

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) {
      func.apply(context, args)
    }
  } as any
}
