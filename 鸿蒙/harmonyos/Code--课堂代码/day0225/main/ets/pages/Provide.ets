import promptAction from '@ohos.promptAction';
class Person{
  name:string=""
  age:number=0

  constructor(name:string,age:number) {
    this.name=name;
    this.age=age;
  }
}
@Entry
@Component
struct Index {

  @Provide("people")
  @Watch("update")
  p:Person={name:"lili",age:18}

  //监听p, 当p发生变化时，做某些事情
  //一打开页面的时候，不会立刻监听，只有监听的数据变化的时候才会执行监听函数
  update(){
    promptAction.showToast({
      message:this.p.age.toString()
    })
  }

  build() {
    Column() {
      Text(`父组件--${this.p.name}---${this.p.age}`)
      Button("age add").onClick(()=>{
        this.p.age++;
      })

      Child()
    }
    .width("100%")
    .height("100%")
  }
}

@Component
struct Child {

  build() {
    Column() {
      Text(`子组件`)

      ChildChild()
    }
    .width("100%")
    .height(200)
    .backgroundColor(Color.Green)
  }
}

@Component
struct ChildChild {
  //祖先和后代 双向数据流
  //后代使用别名的时候，装饰器也给其传递一个名称值，保持一致
  @Consume("people") pp:Person

  build() {
    Column() {
      Text(`孙子组件--${this.pp.name}---${this.pp.age}`)
      Button("age add").onClick(()=>{
        this.pp.age++;
      })
    }
    .width("100%")
    .height(100)
    .backgroundColor(Color.Pink)
  }
}

