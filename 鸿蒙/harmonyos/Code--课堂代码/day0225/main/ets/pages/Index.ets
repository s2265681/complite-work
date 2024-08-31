
@Entry
@Component
struct Index {
  @State num:number=10
  build() {
      Column() {
        Text(`父组件---${this.num}`)
        Button("修改num的值").onClick(()=>{
          this.num++;
        })
        // Child({num:this.num})
        //@Link 要使用$
        Child({num:$num})
      }
      .width("100%")
      .height("100%")
  }
}

@Component
struct Child {
  //可以直接传递数据，但是父组件修改数据，子组件不会修改
  //子组件修改数据，数据不变
  // num:number=0

  //@Prop 流单项数据 父组件修改数据--子组件也会修改数据
  //子组件修改后的数据---父组件不会同步修改
  // @Prop num:number

  //@Link 双向数据流
  // 修改子组件的时候父组件同步更新
  // 修改父组件的时候子组件会同步更新
  @Link num:number
  build() {
    Column() {
      Text(`子组件---${this.num}`)
      Button("修改num的值").onClick(()=>{
        this.num++;
      })
    }
    .width("100%")
    .height(100)
    .backgroundColor(Color.Pink)
  }
}