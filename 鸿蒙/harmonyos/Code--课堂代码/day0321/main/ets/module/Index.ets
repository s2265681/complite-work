//通过首选项 创建一个仓库，存储闹钟
import preferences from '@ohos.data.preferences'
export class ClockItemClass{
  id:string=""
  hour:number=0
  minute:number=0
  enable:boolean=false//是否开启响铃 默认不开启
  reminderId:number=0//后台任务 响铃的唯一id
}
export const Store_Name="User_Clock_Store"

export class ClockStore{
  getStore(){
    return preferences.getPreferences(getContext(this),Store_Name)
  }
  //存储(修改)闹铃
  async setClock(clock:ClockItemClass){
    const store=await this.getStore()
    //{id1:"ClockItem" ,id2:"ClockItem" ,id3:"ClockItem"}
    await store.put(clock.id,JSON.stringify(clock))
    await store.flush()
  }
  //获取闹铃
  async getAllClock(){
    const store=await this.getStore()
    const allData=await store.getAll()//获取仓库全部的值
    //{id1:"ClockItem" ,id2:"ClockItem" ,id3:"ClockItem"}
    //想要：[ClockItem obj,ClockItem obj]
    //Object.values(allData)--->["ClockItem","ClockItem"]
    const result = Object.values(allData).map<ClockItemClass>((item)=>{
      return JSON.parse(item)
    })
    return result
  }

  //删除闹铃
  async delClock(id:string){
    const store=await this.getStore()
    await store.delete(id)
    await store.flush()
  }
}
