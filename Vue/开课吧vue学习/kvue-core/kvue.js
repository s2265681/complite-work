// 封装kVue的类 用户new Vue({传入data})

class KVue{
    constructor(options) {
        this.$options = options;

        // 数据响应化
        this.$data = options.data;
        this.observe(this.$data);

        // // 模拟Watcher();
        // new Watcher();
        // this.$data.test;
        // new Watcher();
        // this.$data.foo.bar;

        new Compile(options.el,this);

        // 执行生命周期的钩子
        // 先判断created是不是有写
        if(options.created){
            // 执行created方法，同时绑定this
            options.created.call(this);  //绑定this，所有页面才可以放心大胆的用this

        }
    }

    observe(value) {
        if(!value||typeof value !=='object'){
            return;
        }

        //遍历该对象
        Object.keys(value).forEach(key=>{
            this.defineReactive(value,key,value[key]);
            // 代理data中的属性直接到vue的实例上
            this.proxyData(key);

        })
    }

        // 数据的响应化函数
        defineReactive(obj,key,val){
           
             // 判断
             if(val&&typeof val ==="object"){
                this.observe(val);  // 解决数据的层次嵌套，递归 没有深度遍历
            }

            const dep = new Dep();


            Object.defineProperty(obj,key,{
                get(){
                    Dep.target && dep.addDep(Dep.target)
                    return val;
                },
                set(newVal){
                    // return val;
                    if(newVal==val){
                        return
                    }else{
                        val = newVal;
                        // console.log(`${key}属性改变`)
                        dep.notify()
                    }
                }
            }) 
  
        }

        proxyData(key){
            Object.defineProperty(this,key,{
                get(){
                    return this.$data[key]
                },
                set(newVal){
                    this.$data[key] = newVal;
                }
            })  // this 是当前vue的实例
        }
}

// Dep： 用来管理Watcher的 ， 用来管理观察者
class Dep{
    constructor(){
        // 这里存放若干依赖(watcher)
        this.deps=[];

    }

    addDep(dep) {  // 添加依赖
        this.deps.push(dep)
    }

    notify() {    // 通知依赖更新
         this.deps.forEach(dep=>dep.update())
    }
}

// Watcher
class Watcher{
    constructor(vm,key,cb){
        this.vm=vm;
        this.key=key;
        this.cb=cb;
        // 将当前watcher实力制定到Dep静态属性targrt
        Dep.target=this;
        this.vm[this.key]; // 读属性触发getter，添加依赖
        Dep.target=null;   // 置空

    }

    update(){
        console.log('属性更新了')
        this.cb.call(this.vm,this.vm[this.key])
    }
}