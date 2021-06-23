class Update{  // pload数据或者说元素
    constructor(payload,nextUpdate){
        this.payload = payload;
        this.nextUpdate = nextUpdate;
    }
}

class UpdateQueue{
    constructor(){
        this.baseState = null // 原状态
        this.firstUpdate = null; // 第一个更新
        this.lastUpdate = null; // 最后一个更新
    }
    enqueUpdate(update){  // 加东西
        if(this.firstUpdate==null){
            this.firstUpdate = this.lastUpdate  = update
        }else{
            this.lastUpdate.nextUpdate = update; // 上一个节点饿nextUpdate执行自己
            this.lastUpdate = update  // 让最后一个节点指向自己
        }
    }
    // 获取老状态，遍历链表，进行更新
    forceUpate(){  // 使用
        let currentState = this.baseState || {};  // 初始状态
        let currentUpdate = this.firstUpdate;
        while(currentUpdate){
            let nextState = typeof currentUpdate.payload == 'function'?
            currentUpdate.payload(currentState):currentUpdate.payload;
            currentState = {...currentState,...nextState};  // 使用当前更新得到新的状态
            currentUpdate = currentUpdate.nextUpdate; // 找下一个节点
        }
        this.firstUpdate = this.lastUpdate = null; // 更新完成后把链表清空
        this.baseState = currentState;
        return currentState;
    }
}

// 计数器 （number：0） setState({number:1})  setState(()=>({ number:state.number+1 }))
let queue = new  UpdateQueue();
queue.enqueUpdate(new Update({name:'zhufeng'}))
queue.enqueUpdate(new Update({number:0}))
queue.enqueUpdate(new Update((state)=>({ number:state.number+1 })))
queue.enqueUpdate(new Update((state)=>({ number:state.number+1 })))
queue.enqueUpdate(new Update((state)=>({ number:state.number+1 })))


let sta = queue.forceUpate()

console.log(sta,'sta')
// { name: 'zhufeng', number: 3 } sta