//复杂类型：JSON格式的字符串
import router from '@ohos.router'
PersistentStorage.PersistProp("user",'{"name":"lili","age":18}')
class Person{
  name:string
  age:18
}

@Entry
@Component
struct Per {
  @StorageLink("user")
  @Watch("update")
  userJSON:string="{}"

  @State user:Person=JSON.parse(this.userJSON)

  update(){
    this.user=JSON.parse(this.userJSON)
  }

  build() {
    Column(){
      Text(`${this.user.name}---${this.user.age}`)
      Button("修改age").onClick(()=>{
        this.user.age++
        //写入 AppStorage.Set 储存
        AppStorage.Set<string>("user",JSON.stringify(this.user))
      })

      Button("获取user").onClick(()=>{
        //获取 AppStorage.Get 储存
        let result=AppStorage.Get<string>("user")
        console.log(result)
      })


      Button("通过link 获取/写入user").onClick(()=>{
        let userLink:SubscribedAbstractProperty<string>=AppStorage.Link("user")
        console.log(userLink.get())
        userLink.set(JSON.stringify({"name":"Tom","age":28}))
      })

      Button("跳转到otherPage").onClick(()=>{
         router.pushUrl({
           url:"pages/OtherPage"
         })
      })
    }
    .width("100%")
    .height("100%")
  }
}
