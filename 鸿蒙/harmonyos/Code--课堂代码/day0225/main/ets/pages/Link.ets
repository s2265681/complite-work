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
  @State p:Person={name:"lili",age:18}

  build() {
    Column() {
      Text(`父组件--${this.p.name}---${this.p.age}`)
      Button("age add").onClick(()=>{
        this.p.age++;
      })

      //@Link 传递复杂数据的时候，只能传递整体，不能传递某一项
      //后期有方案
      Child({p:$p})
    }
    .width("100%")
    .height("100%")
  }
}

@Component
struct Child {
  @Link p:Person

  build() {
    Column() {
      Text(`子组件--${this.p.name}---${this.p.age}`)
      Button("age add").onClick(()=>{
        this.p.age++;
      })
    }
    .width("100%")
    .height("100%")
  }
}

