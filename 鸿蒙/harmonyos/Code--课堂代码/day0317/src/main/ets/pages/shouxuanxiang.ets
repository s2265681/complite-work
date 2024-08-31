import { User, UserStore } from '../utils/userStore'
@Entry
@Component
struct Index {
  userStore:UserStore=new UserStore()

  @State user:Partial<User>={}

  //一打开页面重新获取 首选项数据
  //不能使用 async await
  //可以使用 then catch
  aboutToAppear(){
    this.userStore.getUser().then((data)=>{
      this.user=data
    })
  }

  build() {
    Column() {
      Text(`${this.user.name}---${this.user.age}`)

      Button("存储 修改").onClick(async ()=>{
        await this.userStore.setUser({name:"lili",age:33})
      })

      Button("获取").onClick(async ()=>{
        this.user=await this.userStore.getUser()
      })

      Button("删除").onClick(async ()=>{
        await this.userStore.delUser()
      })
    }
    .width('100%')
    .height('100%')
  }
}




