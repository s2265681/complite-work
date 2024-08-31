
import picker from '@ohos.file.picker'
import { Permissions } from '@ohos.abilityAccessCtrl'
import PermissionUtil from '../common/PermissionUtil'
import promptAction from '@ohos.promptAction'
import common from '@ohos.app.ability.common'
import fs from '@ohos.file.fs';
import request from '@ohos.request'

@Entry
@Component
struct CameraPage {
  @State message: string = ''
  @State filePath: string = ""
  @State videoPath: string = ""

  //相册选择
  async pickerPhoto() {
    try {
      let PhotoSelectOptions = new picker.PhotoSelectOptions();//选择相册的信息
      //相册的信息配置
      PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;//IMAGE_TYPE 图片
      PhotoSelectOptions.maxSelectNumber = 5;//选择最大的图片数
      //开始选择相册  photoPicker.select
      let photoPicker = new picker.PhotoViewPicker();
      photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult) => {
        this.message=JSON.stringify(PhotoSelectResult.photoUris[0])
        this.filePath=PhotoSelectResult.photoUris[0]//将相片选择的第一张展示
        this.changImageUri(PhotoSelectResult.photoUris[0])
      }).catch((err) => {
        this.message='PhotoViewPicker.select failed with err: ' + err
      });
    } catch (err) {
      this.message='PhotoViewPicker failed with err: ' + err
    }
  }

  //将图片地址 `datashare:///media/image/xxxx` 转换成  `internal://cache/XXX.jpg`
  changImageUri(uri){
    fs.open(uri,fs.OpenMode.READ_ONLY).then((data)=>{
      let context:Context=getContext(this) as Context
      let fileName=Date.now()//获取时间戳 作为上传图片的名称
      let newDir=context.cacheDir+"/"+fileName+".jpg" //将上传的图片复制到该目录下
      fs.copyFile(data.fd,newDir).then(()=>{
        this.uploadImage(newDir)//上传的图片是 复制的图片
      }).catch(e=>{
        this.message=e.message+""
      })
    }).catch(e=>{
      this.message=e.message+""
    })
  }

  //上传图片
  uploadImage(newDir:string){
    //["xxx/xxx/xxx/cache/","1232324424.jpg"]
    let uri="internal://cache/"+newDir.split("cache/")[1]
    let uploadConfig={
      url: 'https://graph.baidu.com/upload', //需要手动替换为真实服务器地址
      header: { 'Accept': '*/*' ,'Content-Type': 'multipart/form-data'},
      method: "POST",
      files: [{ filename: "testjpg", name: "test", uri: uri, type: "jpg" }],
      data: [{ name: "name123", value: "123" }],
    }
    try{
      request.uploadFile(getContext(this),uploadConfig).then((uploadTask)=>{
        this.message="OK"
        //展示一下上传进度  uploadTask.on()
        //uploadedSize: 当前已上传文件的大小 KB ,totalSize:总上传文件的大小 KB
        //没有压缩的图片： 288081 KB
        uploadTask.on("progress",(uploadedSize,totalSize)=>{
          this.message="totalSize:"+totalSize+"\n uploadedSize:"+uploadedSize
        })
      }).catch(err=>{
        this.message=JSON.stringify(err)
      })

    }catch(err){
      this.message=''+err.message
    }
  }



  build() {
    Scroll(){
      Column() {

        Button() {
          Text("相册选择--同时图片上传服务器")
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }.onClick((event: ClickEvent) => {
          this.pickerPhoto()
        }).margin({
          top: 10
        })
        .width("80%")
        .height(44)

        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Image(this.filePath)
          .width(120)
          .height(120)
          .backgroundColor(Color.Grey)
          .margin({ top: 20 })

      }
      .width('100%')
    }
  }
}