const History = {
    _history:[], // 历史记录对栈
    install(Vue) {
        // vue规定的自定义插件方式
        Object.defineProperty(Vue.prototype,"$routerHistory",{
            get(){
                return History;
            }
        });
    },
    push(path) {
        // 入栈
        this._current+=1;
        this._history.push(path);
    },
    pop(){
        // 出栈
        this._current-=1;
        return this._history.pop();
    },
    canBack(){ // 判断能不能后退
        return this._history.length > 1;
    }
}

export default History;