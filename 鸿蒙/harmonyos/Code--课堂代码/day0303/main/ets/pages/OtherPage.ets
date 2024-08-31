class Person{
  name:string
  age:number
}

@Entry
@Component
struct OtherPage {
  @StorageLink("user")
  userJSON:string="{}"

  @State user:Person=JSON.parse(this.userJSON)

  build() {
    Row() {
      Column() {
        Text(`${this.user.name}---${this.user.age}`)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button("修改age").onClick(()=>{
          this.user.age++
          AppStorage.Set<string>("user",JSON.stringify(this.user))
        })


      }
      .width('100%')
    }
    .height('100%')
  }
}