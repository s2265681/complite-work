import geoLocationManager from '@ohos.geoLocationManager'
@Entry
@Component
struct LocationA {
  @State message:string="定位信息"
  geoLocation(){
    let requestInfo = {
      'priority': 0x203,     //位置信息请求 表示优先级信息: 0x203表示快速获取位置优先 ...
      'scenario': 0x300,     //位置信息请求 表示场景信息: 0x300表示未设置场景信息 ...
      'timeInterval': 0,     //表示上报位置信息的时间间隔，单位是秒。取值范围为大于0。
      'distanceInterval': 0, //表示上报位置信息的距离间隔。单位是米，取值范围为大于0。
      'maxAccuracy': 0       //表示精度信息。仅在精确位置功能场景下有效，模糊位置功能生效场景下该字段无意义。取值范围为大于0。
    };

    let LocationFun=(location)=>{
      this.message="定位信息:"+JSON.stringify(location)
    }

    try {
      geoLocationManager.on("locationChange",requestInfo,LocationFun)
    }catch(err){
      this.message="errCode:"+err.code+"errMessage:"+err.message
    }
  }

  build() {
    Column() {
      Button("开启定位")
        .onClick(()=>{
          this.geoLocation()
        })

      Text(this.message)
    }
    .width('100%')
    .height('100%')
  }
}