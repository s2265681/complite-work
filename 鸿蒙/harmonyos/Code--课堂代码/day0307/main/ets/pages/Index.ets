//非持久化 一个UIAbility 中使用
import router from '@ohos.router'
// const storage=new LocalStorage({user:{name:"lili",age:18}})

const storage=LocalStorage.GetShared()

class Person{
  name:string
  age:number
}

@Entry(storage)
@Component
struct StorageA{
  @LocalStorageLink("user")
  user:Person={name:"Tom",age:28}//如果未存储，默认值

  build() {
    Column(){
      Text(this.user.name+"---"+this.user.age)
      Button("修改age").onClick(()=>{
        this.user.age++
      })

      // ChildA()
      // ChildB()

      Button("跳转 OtherPage").onClick(()=>{
        router.pushUrl({
          url:"pages/OtherPage"
        })
      })
    }
    .width("100%")
    .height("100%")
  }
}

// @Component
// struct ChildA{
//
//   @LocalStorageLink("user")
//   user:Person={name:"Tom",age:28}//如果未存储，默认值
//
//   build() {
//     Column(){
//       Text(this.user.name+"---"+this.user.age)
//       Button("修改age").onClick(()=>{
//         this.user.age++
//       })
//
//     }
//     .width("100%")
//     .height(100)
//     .backgroundColor(Color.Pink)
//   }
// }
//
//
// @Component
// struct ChildB{
//
//   @LocalStorageProp("user")
//   user:Person={name:"Tom",age:28}//如果未存储，默认值
//
//   build() {
//     Column(){
//       Text(this.user.name+"---"+this.user.age)
//       Button("修改age").onClick(()=>{
//         this.user.age++
//       })
//
//     }
//     .width("100%")
//     .height(100)
//     .backgroundColor(Color.Red)
//   }
// }









