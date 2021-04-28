module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "db77");
/******/ })
/************************************************************************/
/******/ ({

/***/ "85d1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "db77":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Btn", function() { return /* reexport */ btn; });
__webpack_require__.d(__webpack_exports__, "BtnGroup", function() { return /* reexport */ btnGroup; });
__webpack_require__.d(__webpack_exports__, "transDateStr", function() { return /* reexport */ transDateStr; });
__webpack_require__.d(__webpack_exports__, "formatDate", function() { return /* reexport */ formatDate; });
__webpack_require__.d(__webpack_exports__, "outclick", function() { return /* reexport */ outclick; });
__webpack_require__.d(__webpack_exports__, "clone", function() { return /* reexport */ clone; });
__webpack_require__.d(__webpack_exports__, "mod", function() { return /* reexport */ mod; });
__webpack_require__.d(__webpack_exports__, "sleep", function() { return /* reexport */ sleep; });
__webpack_require__.d(__webpack_exports__, "getNow", function() { return /* reexport */ getNow; });
__webpack_require__.d(__webpack_exports__, "pad", function() { return /* reexport */ pad; });
__webpack_require__.d(__webpack_exports__, "decode", function() { return /* reexport */ decode; });
__webpack_require__.d(__webpack_exports__, "encode", function() { return /* reexport */ encode; });
__webpack_require__.d(__webpack_exports__, "qsParse", function() { return /* reexport */ qsParse; });
__webpack_require__.d(__webpack_exports__, "qsStringify", function() { return /* reexport */ qsStringify; });
__webpack_require__.d(__webpack_exports__, "escapeHtml", function() { return /* reexport */ escapeHtml; });
__webpack_require__.d(__webpack_exports__, "escapeJs", function() { return /* reexport */ escapeJs; });
__webpack_require__.d(__webpack_exports__, "throttle", function() { return /* reexport */ throttle; });
__webpack_require__.d(__webpack_exports__, "debounce", function() { return /* reexport */ debounce; });
__webpack_require__.d(__webpack_exports__, "px2vw", function() { return /* reexport */ px2vw; });
__webpack_require__.d(__webpack_exports__, "realPx", function() { return /* reexport */ realPx; });
__webpack_require__.d(__webpack_exports__, "targetPx", function() { return /* reexport */ targetPx; });
__webpack_require__.d(__webpack_exports__, "isAndroid", function() { return /* reexport */ isAndroid; });
__webpack_require__.d(__webpack_exports__, "isiOS", function() { return /* reexport */ isiOS; });
__webpack_require__.d(__webpack_exports__, "isIPX", function() { return /* reexport */ isIPX; });

// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("e67d")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"35ac06a0-vue-loader-template"}!./node_modules/_vue-loader@15.9.5@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.5@vue-loader/lib??vue-loader-options!./src/packages/Btn/src/btn.vue?vue&type=template&id=4be71fef&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{class:_vm.computedCls,style:(_vm.computedStyle),attrs:{"disabled":_vm.disabled,"type":_vm.actionType},on:{"click":_vm.onClick}},[_c('span',[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/Btn/src/btn.vue?vue&type=template&id=4be71fef&

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--13-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_ts-loader@5.4.5@ts-loader??ref--13-3!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.5@vue-loader/lib??vue-loader-options!./src/packages/Btn/src/btn.vue?vue&type=script&lang=ts&

var ACTION_MAP = ['button', 'submit', 'reset'];
var TYPE_MAP = ['primary', 'danger', 'warning', 'hollow', 'disabled'];
var SIZE_MAP = ['mini', 'small', 'large'];
var SHAPE_MAP = ['round', 'circle', 'square'];
/* harmony default export */ var btnvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'TnBtn',
  props: {
    disabled: Boolean,
    actionType: {
      validator: function validator(value) {
        return ACTION_MAP.indexOf(value) > -1;
      },
      default: 'button'
    },
    type: {
      validator: function validator(value) {
        return TYPE_MAP.indexOf(value) > -1;
      },
      default: 'primary'
    },
    size: {
      validator: function validator(value) {
        return SIZE_MAP.indexOf(value) > -1;
      },
      default: 'large'
    },
    shape: {
      validator: function validator(value) {
        return SHAPE_MAP.indexOf(value) > -1;
      },
      default: 'round'
    },
    bgColor: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    computedCls: function computedCls() {
      var ret = ['tn-btn', "tn-btn--" + this.size, "tn-btn--" + this.type, "tn-btn--" + this.shape];

      if (this.disabled) {
        ret.push('tn-btn--disabled');
      }

      return ret;
    },
    computedStyle: function computedStyle() {
      return {
        backgroundColor: this.bgColor,
        color: this.color
      };
    }
  },
  methods: {
    onClick: function onClick(e) {
      this.$emit('click', e);
    }
  }
}));
// CONCATENATED MODULE: ./src/packages/Btn/src/btn.vue?vue&type=script&lang=ts&
 /* harmony default export */ var src_btnvue_type_script_lang_ts_ = (btnvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/packages/Btn/src/btn.vue?vue&type=style&index=0&lang=stylus&
var btnvue_type_style_index_0_lang_stylus_ = __webpack_require__("ee5a");

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.5@vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/packages/Btn/src/btn.vue






/* normalize component */

var component = normalizeComponent(
  src_btnvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var btn = (component.exports);
// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"35ac06a0-vue-loader-template"}!./node_modules/_vue-loader@15.9.5@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.5@vue-loader/lib??vue-loader-options!./src/packages/Btn/src/btnGroup.vue?vue&type=template&id=4da68521&
var btnGroupvue_type_template_id_4da68521_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tn-btn-group"},[_vm._t("default")],2)}
var btnGroupvue_type_template_id_4da68521_staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/Btn/src/btnGroup.vue?vue&type=template&id=4da68521&

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--13-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_ts-loader@5.4.5@ts-loader??ref--13-3!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.5@vue-loader/lib??vue-loader-options!./src/packages/Btn/src/btnGroup.vue?vue&type=script&lang=ts&

/* harmony default export */ var btnGroupvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'TnBtnGroup'
}));
// CONCATENATED MODULE: ./src/packages/Btn/src/btnGroup.vue?vue&type=script&lang=ts&
 /* harmony default export */ var src_btnGroupvue_type_script_lang_ts_ = (btnGroupvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/packages/Btn/src/btnGroup.vue?vue&type=style&index=0&lang=stylus&
var btnGroupvue_type_style_index_0_lang_stylus_ = __webpack_require__("ff5e");

// CONCATENATED MODULE: ./src/packages/Btn/src/btnGroup.vue






/* normalize component */

var btnGroup_component = normalizeComponent(
  src_btnGroupvue_type_script_lang_ts_,
  btnGroupvue_type_template_id_4da68521_render,
  btnGroupvue_type_template_id_4da68521_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var btnGroup = (btnGroup_component.exports);
// CONCATENATED MODULE: ./src/packages/Btn/index.ts



btn.install = function (Vue) {
  Vue.component(btn.name, btn);
};

btnGroup.install = function (Vue) {
  Vue.component(btnGroup.name, btnGroup);
};


// CONCATENATED MODULE: ./src/packages/Utils/date.ts
// 转化时间字符串，解决兼容性 bug
function transDateStr(time) {
  return time.replace(/-/g, '/'); // iOS 兼容
} // 格式化时间

function formatDate(time, fmt) {
  if (fmt === void 0) {
    fmt = 'YYYY-MM-DD hh:mm:ss';
  }

  if (typeof time === 'string') {
    time = transDateStr(time);
  }

  var d = new Date(time);
  if (!fmt) return time;
  var obj = {
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds()
  };

  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[key] : ('00' + obj[key]).substr(('' + obj[key]).length));
    }
  }

  return fmt;
}
// CONCATENATED MODULE: ./src/packages/Utils/dom.ts
// dom.ts
var $html = document.documentElement;
function outclick(elIds, callback) {
  'touchstart,click'.split(',').forEach(function (type) {
    $html.addEventListener(type, function (e) {
      var $els = Array.from(document.querySelectorAll(elIds));
      if (!$els.length) return;
      var $target = e.target;

      while ($target) {
        if ($els.includes($target)) return;
        $target = $target['parentNode'];
      }

      callback(e);
    }, false);
  });
} // 获取 rect

function getRect(el) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }

  if (el) {
    return el.getBoundingClientRect();
  }

  return {};
}
// CONCATENATED MODULE: ./src/packages/Utils/other.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}; // other.ts


var clone = function clone(d) {
  return JSON.parse(JSON.stringify(d));
}; // 将一维数组按长度 m 分割成二维数组，最后一组不足 m，不传 fill 默认不补

var mod = function mod(arr, m, fill) {
  arr = arr || [];
  m < 0 && (m = 0);
  m = m || 3;
  var ret = [];

  for (var i = 0; i < arr.length; i += m) {
    var row = [];

    for (var j = 0; j < m; ++j) {
      var col = arr[i + j];

      if (fill === undefined) {
        col && row.push(col);
      } else {
        row.push(col || fill);
      }
    }

    ret.push(row);
  }

  return ret;
}; // setTimeout 语法糖

function sleep(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
} // 获取当前时间，为将来扩展为从服务器取时间

function getNow() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , Date.now()];
    });
  });
} // 补0

var pad = function pad(num, n) {
  if (n === void 0) {
    n = 2;
  }

  num = num || '';
  var len = num.toString().length;

  while (len < n) {
    num = "0" + num;
    len++;
  }

  return num;
};
// CONCATENATED MODULE: ./src/packages/Utils/security.ts
// security.ts

/**
 * 解析字符串
 */
function decode(s) {
  try {
    s = decodeURIComponent(s);
  } catch (e) {}

  return s;
}
var encode = encodeURIComponent;
/**
 * 解析 query
 */

var cache = {};
function qsParse(query) {
  if (query === void 0) {
    query = location.search;
  }

  if (cache[query]) return cache[query];
  var params = {};
  query = query.replace(/^\?/, '');
  var queryArr = query.split('&');
  var len = queryArr.length;

  for (var i = 0; i < len; i++) {
    var _a = queryArr[i].split('='),
        k = _a[0],
        v = _a[1];

    k && (params[decode(k)] = decode(v || ''));
  }

  cache[query] = params;
  return params;
}
/**
 * object 反序列化成 string
 */

function qsStringify(o) {
  var s = [];

  for (var i in o) {
    s.push(i + "=" + encode(o[i]));
  }

  return s.join('&');
}
/**
 * 安全
 */

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2f;');
}
function escapeJs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/"/g, '\\"').replace(/`/g, '\\`').replace(/</g, '\\74').replace(/>/g, '\\76').replace(/\//g, '\\/').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\f/g, '\\f').replace(/\v/g, '\\v').replace(/\b/g, '\\b').replace(/\0/g, '\\0');
}
// CONCATENATED MODULE: ./src/packages/Utils/throttle.ts
// 节流函数 制定间隔执行
function throttle(fn, wait, options) {
  if (wait === void 0) {
    wait = 100;
  }

  if (options === void 0) {
    options = {};
  }

  var timeout;
  var context;
  var args;
  var result;
  var previous = 0;

  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
} // 防抖函数，到达指定时间间隔执行

function debounce(func, waitMilliseconds, isImmediate) {
  if (waitMilliseconds === void 0) {
    waitMilliseconds = 50;
  }

  if (isImmediate === void 0) {
    isImmediate = false;
  }

  var timeoutId;
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var context = this;

    var doLater = function doLater() {
      timeoutId = undefined;

      if (!isImmediate) {
        func.apply(context, args);
      }
    };

    var shouldCallNow = isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
}
// CONCATENATED MODULE: ./src/packages/Utils/transform.ts
// transform.ts
// 将 px 转化为 vw
var px2vw = function px2vw(pixel, viewportWidth, unitPrecision, minPixelValue) {
  if (viewportWidth === void 0) {
    viewportWidth = 375;
  }

  if (unitPrecision === void 0) {
    unitPrecision = 3;
  }

  if (minPixelValue === void 0) {
    minPixelValue = 1;
  }

  if (pixel <= minPixelValue) return pixel;
  return (pixel * 100 / viewportWidth).toFixed(unitPrecision) + 'vw';
}; // 转化为实际 px

var realPx = function realPx(pixel, viewportWidth, unitPrecision) {
  if (viewportWidth === void 0) {
    viewportWidth = 375;
  }

  if (unitPrecision === void 0) {
    unitPrecision = 3;
  }

  var screenWidth = window.screen.width;
  return +(pixel * screenWidth / viewportWidth).toFixed(unitPrecision);
}; // 转化为目标 px

var targetPx = function targetPx(pixel, viewportWidth, unitPrecision) {
  if (viewportWidth === void 0) {
    viewportWidth = 375;
  }

  if (unitPrecision === void 0) {
    unitPrecision = 3;
  }

  var screenWidth = window.screen.width;
  return +(pixel * viewportWidth / screenWidth).toFixed(unitPrecision);
};
// CONCATENATED MODULE: ./src/packages/Utils/ua.ts
function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}
function isiOS() {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
function isIPX() {
  var screen = window.screen;
  return isiOS() && screen.width === 375 && screen.height === 812;
}
// CONCATENATED MODULE: ./src/packages/Utils/index.ts







// CONCATENATED MODULE: ./src/rockh5.ts



// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "e67d":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "e71a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ee5a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_5_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_2_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_5_vue_loader_lib_index_js_vue_loader_options_btn_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e71a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_5_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_2_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_5_vue_loader_lib_index_js_vue_loader_options_btn_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_5_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_2_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_5_vue_loader_lib_index_js_vue_loader_options_btn_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "ff5e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_5_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_2_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_5_vue_loader_lib_index_js_vue_loader_options_btnGroup_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85d1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_5_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_2_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_5_vue_loader_lib_index_js_vue_loader_options_btnGroup_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_5_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_2_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_5_vue_loader_lib_index_js_vue_loader_options_btnGroup_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

/******/ });