!(function() {
  // 工具函数不仅在window上还有node、小程序、webworker等使用
  // let root = this;
  let root =
    (typeof self == "object" && self.self == self && self) ||
    (typeof global == "object" && global.global == global && global) ||
    this ||
    {};

  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;

  // 面向对象编程  
  let _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // module模块化的导出
  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.VERSION = '0.1'
  
  // 最大的index
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // 判断是不是类数组
  var isArrayLike = function(collection) {
    var length = collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };
// 遍历
_.each = function(obj, callback) {
    var length, i = 0;
    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], obj[i], i) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], obj[i], i) === false) {
                break;
            }
        }
    }
    return obj;
}
// 判断是不是Function
_.isFunction = function(obj) {
    return typeof obj == 'function' || false;
};
  // 查找所有的方法
_.functions = function(obj) {
    var names = [];
    for (var key in obj) {
        if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
};
 
 // mixin前面添加方法
_.reverse = function(string){
    return string.split('').reverse().join('');
  }

  // mixin 将方法挂在到_.prototype上
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function() {
            var args = [this._wrapped];

            push.apply(args, arguments);

            return func.apply(_, args);
        };
    });
    return _;
};

_.mixin(_);

})();
