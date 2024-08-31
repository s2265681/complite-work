import batteryInfo from '@ohos.batteryInfo'

@Entry
@Component
struct BatteryInfoA {

  build() {
    Column({space:20}) {
      Text(`电池的剩余电量：${batteryInfo.batterySOC}`)
      Text(`电池的充电状态：${batteryInfo.chargingStatus}`)
      Text(`电池的健康状态：${batteryInfo.healthStatus}`)
      Text(`电池的充电类型：${batteryInfo.pluggedType}`)


      Text(`${JSON.stringify(globalThis.myUser)}`)

    }
    .width('100%')
    .height('100%')
  }
}