



import router from '@ohos.router'
//@StorageProp 单项数据同步，只会更改当前组件页面，不会同步到仓库里
//@StorageLink 双向数据同步，即会更改组件页面，也会同步到仓库里
//持久化
PersistentStorage.PersistProp("num",100)

@Entry
@Component
struct Index {
  @StorageLink("num")
  num:number=0

  build(){
    Column(){
      Text(`${this.num}`)
      Button("修改Num").onClick(()=>{
        this.num++
      })

      Button("OtherPage").onClick(()=>{
        router.pushUrl({
          url:"pages/OtherPage"
        })
      })

      Child()
    }
  }
}

@Component
struct Child{
  @StorageProp("num")
  num:number=0

  build(){
    Column(){
      Text(`${this.num}`)
      Button("修改Num").onClick(()=>{
        this.num++
      })
    }
    .height(100)
    .width("100%")
    .backgroundColor(Color.Pink)
  }
}
