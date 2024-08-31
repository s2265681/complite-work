@Entry
@Component
struct IndexR{

  build() {
    Column() {
      Tabs({barPosition:BarPosition.End}){
        TabContent(){
          Video({
            src:$rawfile("shanghai.mp4")
          })
            .width("100%")
            .height(120)
        }.tabBar('本地视频')
        TabContent(){
          Video({
            src:"https://vd4.bdstatic.com/mda-qbb9t3mwk03e16yb/hd/cae_h264/1707847074205098110/mda-qbb9t3mwk03e16yb.mp4?auth_key=1708518700-0-0-9531fdda76866988bce5e5caec6176dc&bcevod_channel=searchbox_feed&pd=1&cr=1&cd=0&pt=4&logid=1899984717&vid=8631395586504931348&abtest=all"
          })
            .width("100%")
            .height(120)
        }.tabBar('线上视频')
        TabContent(){
          //音频
          Video({
            src:$rawfile("hepai.m4a")
          })
            .width("100%")
            .height(120)
        }.tabBar('本地音乐')
      }

    }
    .width('100%')
    .height('100%')
  }
}