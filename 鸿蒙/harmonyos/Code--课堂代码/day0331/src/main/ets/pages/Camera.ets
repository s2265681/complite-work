
import picker from '@ohos.file.picker'
import { Permissions } from '@ohos.abilityAccessCtrl'
import PermissionUtil from '../common/PermissionUtil'
import promptAction from '@ohos.promptAction'
import common from '@ohos.app.ability.common'

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
        this.message=JSON.stringify(PhotoSelectResult)
        this.filePath=PhotoSelectResult.photoUris[0]//将相片选择的第一张展示
      }).catch((err) => {
        this.message='PhotoViewPicker.select failed with err: ' + err
      });
    } catch (err) {
      this.message='PhotoViewPicker failed with err: ' + err
    }
  }

  //相机拍照 ohos.want.action.imageCapture
  //用户权限  相机拍照  动态权限的申请
  async takePhoto() {
    let permissions:Array<Permissions>=['ohos.permission.CAMERA','ohos.permission.READ_MEDIA']
    //检测用户APP有没该权限
    let HasPermission=await PermissionUtil.checkPermission(permissions)
    if(HasPermission){//有权限，可以去拍照
      this.doTakePhoto()
    }else{//动态申请
      let HasGrant=await PermissionUtil.requestPermission(permissions)
      if(HasGrant){//动态申请成功
        this.doTakePhoto()
      }else{//失败 跳转引导页面
        PermissionUtil.openPermissionSettings("com.example.myapplicationd")//你的包名
      }
    }
  }

  doTakePhoto() {
    let context=getContext(this) as common.UIAbilityContext
    let wantInfo={
      action:`ohos.want.action.imageCapture`,
      parameters:{}//参数
    }
    context.startAbilityForResult(wantInfo).then((result)=>{
      this.message=JSON.stringify(result)
      this.filePath=result.want.uri
    }).catch(err=>{
      this.message=""+err
    })
  }

  //录制视频 ohos.want.action.videoCapture
  async takeVideo() {
    let permissions:Array<Permissions>=['ohos.permission.CAMERA','ohos.permission.READ_MEDIA']
    //检测用户APP有没该权限
    let HasPermission=await PermissionUtil.checkPermission(permissions)
    if(HasPermission){//有权限，可以去录视频
      this.doTakeVideo()
    }else{//动态申请
      let HasGrant=await PermissionUtil.requestPermission(permissions)
      if(HasGrant){//动态申请成功
        this.doTakeVideo()
      }else{//失败 跳转引导页面
        PermissionUtil.openPermissionSettings("com.example.myapplicationd")//你的包名
      }
    }
  }

  doTakeVideo() {
    let context=getContext(this) as common.UIAbilityContext
    let wantInfo={
      action:`ohos.want.action.videoCapture`,
      parameters:{}//参数
    }
    context.startAbilityForResult(wantInfo).then((result)=>{
      this.message=JSON.stringify(result)
      this.videoPath=result.want.uri
    }).catch(err=>{
      this.message=""+err
    })
  }

  build() {
    Scroll(){
      Column() {

        Button() {
          Text("拍照")
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }.onClick((event: ClickEvent) => {
          this.takePhoto()
        }).margin({
          top: 10
        })
        .width("80%")
        .height(44)

        Button() {
          Text("相册选择")
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

        Button() {
          Text("录制视频")
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }.onClick((event: ClickEvent) => {
          this.takeVideo()
        }).margin({
          top: 10
        })
        .width("80%")
        .height(50)

        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Image(this.filePath)
          .width(120)
          .height(120)
          .backgroundColor(Color.Grey)
          .margin({ top: 20 })

        Video({
          src: this.videoPath
        }).width("100%")
          .height(300)
          .margin({ top: 20 })
      }
      .width('100%')
    }
  }
}