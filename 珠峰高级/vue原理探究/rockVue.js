export class RockVue {
  constructor(config) {
    this.template = document.querySelector(config.el);
    this.data = reactive(config.data);
    // 处理method的方法
    for (const name in config.methods) {
      this[name] = () => {
        config.methods[name].apply(this.data);
      };
    }
    this.traversal(this.template);
  }
  traversal(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim().match(/^{{([\s\S]+)}}$/)) {
        let name = RegExp.$1.trim();
        effect(() => (node.textContent = this.data[name]));
      }
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      let attributes = node.attributes;
      console.log(attributes, 'attributes');
      for (let attribute of attributes) {
        // v-model
        if (attribute.name === 'v-model') {
          let name = attribute.value;
          effect(() => (node.value = this.data[name]));

          node.addEventListener('input', (event) => {
            this.data[name] = node.value;
          });
        }
        // v-bind title
        if (attribute.name.match(/^v\-bind:([\s\S]+)$/)) {
          let attrname = RegExp.$1;
          let name = attribute.value;
          effect(() => node.setAttribute(attrname, this.data[name]));
        }

        // v-on 事件处理
        if (attribute.name.match(/^v\-on:([\s\S]+)$/)) {
          let eventName = RegExp.$1;
          let fnname = attribute.value;
          node.addEventListener(eventName, this[fnname]);
        }

        // v-if 条件处理
        if (attribute.name === 'v-if') {
          let value = attribute.value;
          effect(() => {
            node.style.display = this.data[value] ? 'block' : 'none';
          });
        }
      }
    }

    if (node.childNodes && node.childNodes.length) {
      for (let child of node.childNodes) {
        this.traversal(child);
      }
    }
  }
}

let effects = new Map();
let currentEffect = null;

function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

function reactive(obj) {
  let observed = new Proxy(obj, {
    get: function (obj, prop) {
      // obj代表所以对象 {name: "张三", age:12}  props 代表获取谁
      // console.log(obj, prop);
      if (currentEffect) {
        if (!effects.has(obj)) effects.set(obj, new Map());
        if (!effects.get(obj).has(prop))
          effects.get(obj).set(prop, new Array());
        effects.get(obj).get(prop).push(currentEffect);
      }
      return obj[prop];
    },
    set: function (obj, prop, value) {
      // obj代表所以对象 {name: "张三", age:12} props 代表替换谁 value 代表要替换的值
      // console.log(obj, prop, value);
      window.obj = obj;
      obj[prop] = value;
      if (effects.has(obj) && effects.get(obj).has(prop)) {
        for (let effect of effects.get(obj).get(prop)) {
          effect();
        }
      }
      return true;
    },
  });
  return observed;
}
// console.log(effects, 'effects');
// window.effects = effects;
