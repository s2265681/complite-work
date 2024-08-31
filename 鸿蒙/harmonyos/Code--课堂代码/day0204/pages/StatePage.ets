@Entry
@Component
struct APage {
  //@State 响应式   视图更新--数据更新  数据更新---视图更新
  @State count:number=0

  build() {
    Row() {
      Column() {
        Text(`${this.count}`)

        Button("add").onClick(()=>{
          this.count++;
          //数据更新了，视图没有更新
          console.log(`${this.count}`);
        })
      }.width('100%')
    }.height('100%')
  }
}