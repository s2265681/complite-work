
import sensor from '@ohos.sensor'

@Entry
@Component
struct sensor {
  @State message:string=""
  getSensor(){
    try {
      sensor.on(sensor.SensorId.ACCELEROMETER,(data)=>{
        this.message=`x:${data.x}\n y:${data.y} \n Z:${data.z}`
      })

    }catch(err){
      console.log(""+err.code+","+err.message)
    }
  }

  build() {
    Column({space:20}) {
      Button("获取重力加速度")
        .height(200)
        .width(200)
        .onClick(()=>{
          this.getSensor()
        })

      Text(this.message)

    }
    .width('100%')
    .height('100%')
  }

}