// 源码学习


(function(){
    var root  = typeof self  === 'object' && self.self === self && self || 
    typeof global === 'object' && global.global === global && global ||
    this || {}

    var ArrayProto = Array.prototype,
        push = ArrayProto.push;


    var _ = function(obj){
        if(obj instanceof _) return obj;
        if(!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    if(typeof exports != 'undefined' && !exports.nodeType) {
        if(typeof module != 'undefined' && !module.nodeType && module.exports){
            exports = module.exports = _;
        }
        exports._ = _;
    }else{
        root._ = _;
    }
    
    _.VERSION = '0.1';

    var MAX_ARRAY_INDEX = Math.pow(2,53) -1;

    var isArrayLike = function(collection) {
        var length = collection.length;
        return typeof length === 'number' && length >=0 && length <= MAX_ARRAY_INDEX;
    }

    _each = function(obj,callback) {
        var length,i=0;
        
        if(isArrayLike(obj)) {
            length = obj.length;
            for(;i<length;i++) {
                if(callback.call(obj[i],obj[i],i) === false) {
                    break;
                }
            }
        }else {
            for(i in obj) {
                if(callback.call(obj[i],obj[i],i) === false){
                    break;
                }
            }
        }
        return obj;
    }

    _.isFunction = function(obj){
        return typeof obj == 'function' || false;
    }

    _.functions = function(obj) {
        var names = [];
        for(var key in obj) {
            if(_.isFunction(obj[key])) this.name.push(key);
        }
        return names.sort();
    }

    // 再_.mixin(_) 前面添加自定义的方法
    _.reverse = function(string) {
        return string.split('').reverse().join('')
    }

    // _.mixin
    // _mixin(_) 添加自己定义的方法
    _.mixin = function(obj) {
        _each(_.functions(obj),function(name){
            var func = _[name] = obj[name];
            _prototype[name] = function(){
                var args = [this._wrapped];
                push.apply(args,arguments);
                return func.apply(_,args);
            }
        })
    }

    _.mixin(_);

})()



