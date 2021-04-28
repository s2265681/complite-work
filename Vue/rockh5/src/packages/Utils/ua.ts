export function isAndroid () {
    const u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  }
  
  export function isiOS () {
    const u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  
  export function isIPX () {
    let screen = window.screen
    return isiOS() && screen.width === 375 && screen.height === 812
  }