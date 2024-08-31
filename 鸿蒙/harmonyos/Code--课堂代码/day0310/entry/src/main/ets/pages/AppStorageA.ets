export class Person{
  name:string
  age:number
}

AppStorage.SetOrCreate<Person>("user",{"name":"lili","age":18})

//@StorageLink---双向数据存储
//@StorageProp---单项数据存储

@Entry
@Component
struct AppStorageA {
  //  @StorageProp("user") 报错的话  这个报错可以忽略
  @StorageLink("user")
  user:Person={name:"Tom",age:28}//默认值

  build() {
    Row() {
      Column() {
        Text(this.user.name+"---"+this.user.age)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button("修改age").onClick(()=>{
          this.user.age++
        })

        Button("修改age2").onClick(()=>{
          AppStorage.Set<Person>("user",{name:"Lisa",age:33})
        })

        Button("获取user").onClick(()=>{
          const user=AppStorage.Get<Person>("user")
          console.info(user.name)
        })

        //通过Link的方式，设置和获取
        Button("获取user，设置").onClick(()=>{
          const userLink:SubscribedAbstractProperty<Person>=AppStorage.Link("user")
          userLink.set({name:"小王",age:33})
          const getUser=userLink.get()
          console.info(getUser.name)
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}