// transform.ts
// 将 px 转化为 vw
export const px2vw = (pixel, viewportWidth = 375, unitPrecision = 3, minPixelValue = 1): string => {
    if (pixel <= minPixelValue) return pixel
    return (pixel * 100 / viewportWidth).toFixed(unitPrecision) + 'vw'
}

// 转化为实际 px
export const realPx = (pixel, viewportWidth = 375, unitPrecision = 3): number => {
  const screenWidth = window.screen.width
    return +((pixel * screenWidth / viewportWidth).toFixed(unitPrecision))
}

// 转化为目标 px
export const targetPx = (pixel, viewportWidth = 375, unitPrecision = 3): number => {
    let screenWidth = window.screen.width
    return +((pixel * viewportWidth / screenWidth).toFixed(unitPrecision))
}
