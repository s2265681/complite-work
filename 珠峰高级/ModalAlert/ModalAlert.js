(function () {
  function ModalAlert() {
    return new init();
  }
  // 类的原型：公共的属性方法

  ModalAlert.prototype = {
    constructor: ModalAlert,
  };

  function init() {}

  init.prototype =
    // 浏览器直接导入，这样方法是暴露到全局
    window.ModalAlert = ModalAlert;
  // 支持ES6 Module/CommonJs 模块导入规范
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ModalAlert;
  }
})();

ModalAlert();
