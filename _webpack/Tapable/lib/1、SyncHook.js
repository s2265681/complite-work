

class SyncHook{
    constructor(config){
       this.config = config
       this.tasks = []
    }
    tap(name, fn){
      this.tasks.push(fn)
    }
    call(...args){
        this.tasks.forEach(el=>el(...args))
    }
}

module.exports = {
    SyncHook
}