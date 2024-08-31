

import image from '@ohos.multimedia.image';
import fs from '@ohos.file.fs';

@Entry
@Component
struct PixelMapPage {
  @State pixelMap?: image.PixelMap = undefined
  @State message: string = ""

  aboutToAppear() {
    this.getPixelMap()
  }

  //1.获取文件资源fd----1.获取要处理的图片 2.转化成为Buffer(才能进行图片操作)3.真正操作的是写入的buffer图片
  async getResourceFd() {
    let context=getContext(this) as Context
    //1.获取要处理的图片--resources里面
    const resourceMgr=context.resourceManager //获取resources
    //将resources里面图片 的 对应Buffer
    let imgBuffer=await resourceMgr.getMediaContent($r("app.media.guanggao"))
    //buffer的图片，要写入到文件里
    let cacheDir=context.cacheDir+"/guanggao.jpg"
    let fileData=fs.openSync(cacheDir,fs.OpenMode.READ_WRITE|fs.OpenMode.CREATE)
    fs.writeSync(fileData.fd,imgBuffer.buffer)
    return fileData.fd// PixelMap操作的其实是 写入的buffer文件(图片)
  }

  // 2. 获取PixelMap
  async getPixelMap() {
    let fd=await this.getResourceFd()
    //创建一个图片源实例
    const ImageSourceAPI=image.createImageSource(fd)
    if(!ImageSourceAPI){
      return
    }
    //创建PixelMap
    let PixelMap=await ImageSourceAPI.createPixelMap({
      editable:true//是否是可编辑的
    })
    this.pixelMap=PixelMap
  }

  //3. 获取PixelMap后,调用PixelMap的方法对图片进行处理
  //获取图片信息
  getImageInfo() {
    this.pixelMap.getImageInfo().then((info)=>{
      this.message=`width:${info.size.width},height:${info.size.height} \n ${JSON.stringify(info)}`
    })
  }

  //截切图片
  cropImg() {
    this.pixelMap.crop({
      x:100,//x 起始坐标
      y:100,//y 起始坐标
      size:{
        width:300,//裁剪的宽度
        height:300//裁剪的高度
      }
    }).then(()=>{
      this.message="截切图片成功"
    })

  }

  //缩放 压缩
  scaleImg() {
    this.pixelMap.scale(0.5,0.5).then(()=>{
      this.message="缩放图片成功"
    })
  }

  //位移
  translateImg() {
    this.pixelMap.translate(100,100).then(()=>{
      this.message="位移图片成功"
    })
  }

  //改变透明度
  opacityImg() {
    this.pixelMap.opacity(0.5).then(()=>{
      this.message="改变透明度成功"
    }).catch(err=>{
      this.message=err+""
    })
  }

  //旋转
  rotateImg() {
    this.pixelMap.rotate(90).then(()=>{
      this.message="旋转成功"+Math.random()
    }).catch(err=>{
      this.message=err+""
    })
  }

  //翻转
  flipImg() {
    //false 水平翻转  true 垂直翻转
    this.pixelMap.flip(false,true).then(()=>{
      this.message="翻转成功"+Math.random()
    }).catch(err=>{
      this.message=err+""
    })
  }

  @Styles commonStyle(){
    .width("80%")
    .height(40)
  }

  build() {
    Scroll() {
      Column({space:15}) {
        Text(this.message).
        width("100%")
          .fontSize(16)
          .textAlign(TextAlign.Center)
          .margin({top:10})

        Button("获取图片尺寸")
          .commonStyle()
          .margin({ top: 15 })
          .onClick((event: ClickEvent) => {
            this.getImageInfo()
          })

        Button("截切图片")
          .commonStyle()
          .onClick((event: ClickEvent) => {
            this.cropImg()
          })

        Button("缩放图片")
          .commonStyle()
          .onClick((event: ClickEvent) => {
            this.scaleImg()
          })

        Button("偏移")
          .commonStyle()
          .onClick((event: ClickEvent) => {
            this.translateImg()
          })

        Button("旋转")
          .commonStyle()
          .onClick((event: ClickEvent) => {
            this.rotateImg()
          })

        Button("翻转")
          .commonStyle()
          .onClick((event: ClickEvent) => {
            this.flipImg()
          })

        Button("透明度")
          .commonStyle()
          .onClick((event: ClickEvent) => {
            this.opacityImg()
          })

        //这个位置是 this.pixelMap 就含有处理后的图片
        Image(this.pixelMap ? this.pixelMap : '')
          .objectFit(ImageFit.Contain).width(300)

      }
      .width('100%')

    }
  }
}
