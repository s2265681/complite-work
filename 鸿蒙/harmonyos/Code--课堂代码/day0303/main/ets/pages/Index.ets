//PersistentStorage  存储--写入磁盘--app关闭数据任然存在---持久化--所有页面都可以使用
//简单：number string ....
//复杂：{} []
//获取
// @StorageProp单项数据存储   只是组件内可以改变数据，并不会写入PersistentStorage
// @StorageLink 双向数据存储  可以实现全局状态管理，组件改变的同时写入到PersistentStorage
// 真是项目中  token
PersistentStorage.PersistProp("num",100)

@Entry
@Component
struct Index {
  @StorageLink("num")
  count:number=0//如果未存储，默认初始值

  build() {
    Column(){
      Text(`${this.count}`)
      Button("修改age").onClick(()=>{
        this.count++
      })
    }
    .width("100%")
    .height("100%")
  }
}









