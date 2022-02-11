function trimFun(str){
    let reg = /(^[ ])+|([ ]$)+/g
    return str.replace(reg,'')
}
trimFun(' sdds')
trimFun(' sdds ')
trimFun('sdds ')

// 法二

String.prototype.toTrim = function(str){
   return str.replace(/^\s+/,'').replace(/\s+$/,'')
}


trimFun(' sdds')
trimFun(' sdds ')
trimFun('sdds ')
