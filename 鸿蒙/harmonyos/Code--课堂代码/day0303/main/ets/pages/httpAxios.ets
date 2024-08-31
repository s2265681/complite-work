import axios from "@ohos/axios"
//真是项目中，需要对Axios 二次封装
@Entry
@Component
struct httpAxios {
  getData(){
     axios.get("http://192.168.1.13:3000/listData")
       .then((res)=>{
           AlertDialog.show({
             message:JSON.stringify(res.data)
           })
       }).catch(err=>{
          AlertDialog.show({
         message:JSON.stringify(err)
          })
       })
  }

  build() {
    Column(){
      Text("HttpAxios")
      Button("获取数据").onClick(()=>{
        this.getData()
      })
    }
    .width("100%")
    .height("100%")
  }
}