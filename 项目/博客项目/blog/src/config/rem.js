// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);




//       // rem h5响应式
//       // var width = document.documentElement.clientWidth;
//       // var n = width/750 * 100;
//       // document.documentElement.style.fontSize = n + 'px';




//     //   !function (n) {
//     //     var e = n.document, t = e.documentElement, i = 750, d = i / 100, o = "orientationchange" in n ? "orientationchange" : "resize", a = function () {
//     //       var n = t.clientWidth || 375;
//     //       n > 750 && (n = 750), t.style.fontSize = n / d + "px"
//     //     };
//     //     e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
//     //   }(window);