// 用法，new compile(el,vm) 元素，节点

class Compile {
    constructor(el, vm) {
      // 要遍历的宿主节点
      this.$el = document.querySelector(el);
  
      this.$vm = vm;
  
      // 编译
      if (this.$el) {
        // 转换内部内容为片段Fragment
        this.$fragment = this.node2Fragment(this.$el);
        // 执行编译
        this.compile(this.$fragment);
        // 将编译玩的html结果追加到$el
        this.$el.appendChild(this.$fragment);
      }
    }
  
   // 将宿主元素中的代码片段拿出来遍历，这样做比较高效
    node2Fragment(el) {
      const frag = document.createDocumentFragment();// 创建一个代码块
      // 将el中所有子元素搬家到frag中
      let child;
      while ((child = el.firstChild)) {
        frag.appendChild(child);
      }
      return frag;
    }
  
    compile(el) {
      // 编译过程  1、元素的话 遍历属性，k-model... 2、文本的话，编译文本
      const childNodes = el.childNodes;
      // 从类数组中转出一个数组
      Array.from(childNodes).forEach(node => {
        //类型判断
        if (this.isElement(node)) {// 判断是不是元素
          // 元素
          console.log("编译元素" + node.nodeName);
          // 元素
          // console.log("编译元素"+node.nodeName");
          // 查找k- @
          const nodeAttrs = node.attributes;
          Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name; // 属性名
            const exp = attr.value; // 属性值
  
            if (this.isDirective(attrName)) {  // 判断属性名是不是指令
              // k-text... 指令
              const dir = attrName.substring(2);
              // 执行指令 如果是text  直接执行text 方法
              this[dir] && this[dir](node, this.$vm, exp);
            }
            if (this.isEvent(attrName)) {  // 判断属性名是不是事件
               const dir = attrName.substring(1)  // 如@click
               this.eventHandler(node,this.$vm,exp,dir);
            }
          });
        } else if (this.isInterpolation(node)) {// 判断是不是插值元素
          // 文本
          // console.log('编译文本'+node.textContent)
          this.compileText(node);
        }
        // 递归子节点
        if (node.childNodes && node.childNodes.length > 0) {
          this.compile(node);
        }
      });
    }
  
    // 编译文本 //{{name}}
    compileText(node) {
      console.log(RegExp.$1); // s
      this.update(node, this.$vm, RegExp.$1, "text");
      //   node.textContent=this.$vm.$data[RegExp.$1];
    }
  
    // 更新函数
    update(node, vm, exp, dir) {
      // 节点、vue实例、表达式、指令
      const updateFn = this[dir + "Updater"]; // 从当前类中组函数名
      // 初始化
      updateFn && updateFn(node, vm[exp]);
      // 依赖收集
      new Watcher(vm, exp, function(value) {
        // 实例，属性，方法
        updateFn && updateFn(node, value);
      });
    }
    
    // text函数  k-text 指令的处理方法
    text(node,vm,exp){
        this.update(node,vm,exp,'text')
    }
  
  // 文本处理器
  textUpdater(node, value) {
  // node.textContent=this.$vm.$data[RegExp.$1];
  node.textContent = value;
  }
  
    // 双向绑定的处理 k-model 
    model(node,vm,exp){
      // 执行input的value属性
      this.update(node,vm,exp,'model');
      // 视图对模型的响应
      node.addEventListener("input",e=>{
          vm[exp]=e.target.value;
      })
    }
  
    // 双绑处理器
    modelUpdater(node,value){
        node.value=value;
    }
  
    // html解析器<button></button> ->  node.innerHTML
    htmlUpdater(node,value){
        node.innerHTML=value;
    }
  
    html(node,vm,exp){
      //   console.log(node,vm,exp,'node,vm,exp')
      // node.textContent = vm.html;
      this.update(node,vm,exp,'html')
    }
  
  
  
    // 事件处理器
    eventHandler(node,vm,exp,dir){
      // @click="onClick"
      //   console.log('')
      // exp === onClick  ?
      let fn = vm.$options.methods&&vm.$options.methods[exp];
      if(dir&&fn){
          node.addEventListener(dir,fn.bind(vm));
      }
     }
  
    // 指令处理
    isDirective(attr) {
      return attr.indexOf('k-') ==0;
    }
    
    // 事件处理
    isEvent(attr) {
      return attr.indexOf('@') ==0;
    }
  
    isElement(node) {
      return node.nodeType === 1;
    }
  
    // 插值文本 // 返回文本又是插值
    isInterpolation(node) {
      return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
  }
  