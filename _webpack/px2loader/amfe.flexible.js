let docEl = document.documentElement;
let dpr = window.devicePixelRatio || 1

// https://github.com/amfe/lib-flexible/blob/2.0/index.js
function setRemUnit(){
    // 750情况下 750px
    // Iphone 375px
    if(document.body){
        document.body.style.fontSize = (12 * dpr) + 'px'
    }

   let rem = docEl.clientWidth / 10;
   docEl.style.fontSize = rem + 'px'
}

setRemUnit()

window.addEventListener('resize', setRemUnit)
