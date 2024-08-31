import router from '@ohos.router'
class Person{
  name:string
  age:number
}
const storage=LocalStorage.GetShared()

@Entry(storage)
@Component
struct OtherPage{
  @LocalStorageLink("user")
  user:Person={name:"Tom",age:28}//如果未存储，默认值

  build() {
    Column(){
      Text(this.user.name+"---"+this.user.age)
      Button("修改age").onClick(()=>{
        this.user.age++
      })

      Button("跳转 Index").onClick(()=>{
        router.pushUrl({
          url:"pages/Index"
        })
      })

    }
    .width("100%")
    .height("100%")
  }
}