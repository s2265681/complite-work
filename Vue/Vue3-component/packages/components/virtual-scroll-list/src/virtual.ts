import { RangeOptions, VirtualOptions, updateType } from './props'

const enum CALC_TYPE {
  INIT = 'INIT',
  FIXED = 'FIXED',
  DYNAMIC = 'DYNAMIC'
}
export function initVirtual(param: VirtualOptions, update: updateType) {
  let offsetValue = 0 // 没有滚动前的偏移量
  let caclType = CALC_TYPE.INIT
  let firstRangeAvg = 0
  let fixedSizeVal = 0 // 默认值是0
  const sizes = new Map<string | number, number>()
  const range: RangeOptions = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0
  }
  function isFixed() {
    return caclType === CALC_TYPE.FIXED
  }

  function getEstimateSize() {
    // 优化平均值
    return isFixed() ? fixedSizeVal : firstRangeAvg || param.estimateSize
  }
  function getIndexOffset(idx: number) {
    if (!idx) return 0
    let offset = 0
    for (let i = 0; i < idx; i++) {
      let indexSize = sizes.get(param.uniqueIds[i])
      offset += typeof indexSize === 'number' ? indexSize : getEstimateSize()
    }
    return offset
  }
  function getPadFront() {
    // 准确计算 上偏移量
    if (isFixed()) {
      return fixedSizeVal * range.start
    } else {
      // 将滚动后的元素累加一遍 计算上高度
      return getIndexOffset(range.start)
    }
  }
  function getPadBehind() {
    const lastIndex = param.uniqueIds.length - 1
    return (lastIndex - range.end) * getEstimateSize()
  }
  function updateRange(start: number, end: number) {
    range.start = start
    range.end = end
    range.padFront = getPadFront()
    range.padBehind = getPadBehind()
    update({ ...range })
  }
  function checkRange(start: number, end: number) {
    const total = param.uniqueIds.length // 所有的数据
    const keeps = param.keeps
    if (total < keeps) {
      start = 0
      end = total - 1
      // 最后滑动到了 100条   71-100
      // start = 90  - end= 100
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1
    }
    updateRange(start, end)
  }
  function getScrollOvers() {
    // 根据划过的偏移量 / 每项的高度 ，就是划过的个数  12.5 取整

    // getEstimateSize() 这个值是预估的 我们要精确的找到滚动了多少个
    if (isFixed()) {
      return Math.floor(offsetValue / getEstimateSize())
    } else {
      // 获取最接近的滚动的那一项，计算每一项的偏移量，看与那一项最接近
      // [10,30,50,200,900,1200]  -> 1300  二分查找  O()

      let low = 0
      let high = param.uniqueIds.length
      let middle = 0
      let middleOffset = 0
      while (low <= high) {
        // O(logn)
        middle = low + Math.floor((high - low) / 2)
        middleOffset = getIndexOffset(middle)
        if (middleOffset == offsetValue) {
          return middle
        } else if (middleOffset < offsetValue) {
          low = middle + 1
        } else if (middleOffset > offsetValue) {
          high = middle - 1
        }
      }
      // 12.5个
      return low > 0 ? --low : 0
    }
  }
  function getEndByStart(start: number) {
    const computeEnd = start + param.keeps - 1
    const end = Math.min(computeEnd, param.uniqueIds.length - 1)
    return end
  }
  function handleFront() {
    // 核心就是像上滑动要不要更新start
    // 获取划过了多少个
    const overs = getScrollOvers()
    if (overs > range.start) {
      // 现在从第三十个开始展示，展示了30条，目前是40 滑到了第35个
      return
    }
    // 划过了8个 但是开始是15, 缓存区是10个
    const start = Math.max(overs - param.buffer, 0)
    checkRange(start, getEndByStart(start))
  }
  function handleBehind() {
    const overs = getScrollOvers() // 滚动了1000像素，每一项80的高读
    // 开始是从0 + 10
    if (overs < range.start + param.buffer) {
      // 向下加载的时候看一下是否在缓存区中
      return
    }
    checkRange(overs, getEndByStart(overs))
  }
  function handleScroll(offset: number) {
    // 先看一下向上滚动还是向下滚动
    const direction = offset < offsetValue ? 'FRONT' : 'BEHIND'
    offsetValue = offset
    if (direction === 'FRONT') {
      handleFront()
    } else if (direction === 'BEHIND') {
      handleBehind()
    }
  }

  function saveSize(id: string | number, size: number) {
    sizes.set(id, size)

    if (caclType === CALC_TYPE.INIT) {
      // 第一个元素加载完毕后默认认为是固定高度
      fixedSizeVal = size
      caclType = CALC_TYPE.FIXED
    } else if (caclType === CALC_TYPE.FIXED && fixedSizeVal !== size) {
      caclType = CALC_TYPE.DYNAMIC
      fixedSizeVal = 0 // 默认采用estimateSize
    }
    // 尽可能不要采用 estimateSize 来进行操作
    // 有固定高度 ，  动态高度

    //  如果是动态高度原则上应该用这个estimateSize

    if (caclType === CALC_TYPE.DYNAMIC) {
      // 根据已经加载的数据算一个平均值 来撑开滚动条
      // 根据当前展示的数据 来计算一个滚动条的值
      if (sizes.size < Math.min(param.keeps, param.uniqueIds.length)) {
        firstRangeAvg = Math.round(
          [...sizes.values()].reduce((acc, val) => acc + val, 0) / sizes.size
        )
      }
    }
  }
  // 0 - 30  逻辑类似轮播图
  checkRange(0, param.keeps - 1)
  return {
    handleScroll,
    saveSize
  }
}
// 思想：
// 1) 固定高度的上pading 可以利用 开始范围前面的个数 * 每项的高度
// 2) 下padding 可以利用 总个数 - 当前显示到的个数 * 每项的高度

// 动态高度 （默认要先计算一下滚动条大致多高，根据已经加载的数据尽可能的预估一个滚动条）
// 1) 上padding （默认会记录每一项的高度） 根据当前的start 来累计start之前的每一项的高度
// 2) 下padding 用（ 总个数 - 当前显示到的个数） * 预估的高度

// 当前开始滚动 固定高度可以直接采用 偏移量 / 每项的高度来计算要展现的开始
// 动态的开始位置 需要采用二分查找找到已经加载的哪一项的偏移量和当前的最接近，找到后返回当前的开始
