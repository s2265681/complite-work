import http from '@ohos.net.http'
@Entry
@Component
struct Req {
  @State listData:any={}

  async getData(){
    try{
      const req=http.createHttp()
      let result=await req.request("http://backend-api-01.newbee.ltd/api/v1/index-infos")
      this.listData=result
    }catch(err){
      AlertDialog.show({
        message:JSON.stringify(err)
      })
    }

  }

  // getData(){
  //   const req=http.createHttp()
  //   req.request("http://backend-api-01.newbee.ltd/api/v1/index-infos",{
  //     method:http.RequestMethod.GET,
  //     expectDataType:http.HttpDataType.OBJECT//指定返回数据类型的格式
  //   }).then(res=>{
  //      this.listData=res.result
  //       // AlertDialog.show({
  //       //   message:JSON.stringify(res)
  //       // })
  //   }).catch((err)=>{
  //     AlertDialog.show({
  //       message:JSON.stringify(err)
  //     })
  //   })
  // }

  build() {
    Column(){
      Text(`${JSON.stringify(this.listData)}`)
      Button("获取数据").onClick(()=>{
          this.getData()
      })
    }
    .width("100%")
    .height("100%")
  }
}