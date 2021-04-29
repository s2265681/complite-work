const str = require('./a.js');
const c = require('./c.js');
require('./index.less');
console.log(str,c);


class ZF{
    constructor(){
        this.name = 'sssss'
    }
    getName(){
        return this.name
    }
}

let zf = new ZF()
console.log(zf.getName())