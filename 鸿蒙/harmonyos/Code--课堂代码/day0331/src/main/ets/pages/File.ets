import fileUri from "@ohos.file.fileuri";
import fs from '@ohos.file.fs';

@Entry
@Component
struct IndexFile {
  @State message: string = 'message'

  //获取文件统一资源标志符(文件的路径地址）
  getUri() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    let uri=fileUri.getUriFromPath(fileDir);//获取文件目录
    this.message=uri
  }

  //获取文件的属性
  fsStat() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    fs.stat(fileDir).then((data)=>{
      this.message="文件属性 size:"+data.size//文件内容的长度
    }).catch((err)=>{
      this.message=err.message
    })
  }

  //检查文件是否存在 (text.txt)
  fsAccess() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录\
    fs.access(fileDir).then((data)=>{
      if(data){
        this.message="文件存在"
      }else{
        this.message="文件不存在"
      }
    }).catch((err)=>{
      this.message=err.message
    })
  }

  //打开并创建文件
  fsOpen() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    fs.open(fileDir,fs.OpenMode.READ_WRITE|fs.OpenMode.CREATE).then((file)=>{
      this.message="打开文件成功："+ file.fd
    }).catch((err)=>{
      this.message=err.message
    })
  }

  //写入文件并关闭文件流  第一步：打开文件  第二步：写入内容  第二步：关闭
  fsWrite() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    //同步操作
    let file=fs.openSync(fileDir,fs.OpenMode.READ_WRITE|fs.OpenMode.CREATE)
    fs.write(file.fd,"hello",(err,data)=>{
      if(err){
        this.message="写入失败："+err.message
        return
      }
      this.message="写入数据成功 size:"+data
      fs.closeSync(file.fd)
    })
  }

  //读取文本内容---方法1
  fsReadText() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    fs.readText(fileDir).then((data)=>{
      this.message="读取成功："+data
    }).catch((err)=>{
      this.message="读取失败："+err.message
    })

  }

  //读取文件 以文件流的形式---方法2
  fsReadFile() {
    //注意：手动抛出异常
    try{
      let context:Context=getContext(this) as Context;
      let fileDir=context.filesDir+"/text.txt"//文件目录
      //流的方式读取
      let ss=fs.createStreamSync(fileDir,"r+")//"r+" 打开可读写的文件，该文件必须存在
      //申请一个空间 buffer
      let buf=new ArrayBuffer(4096)//1024*4
      ss.read(buf,(err,readLen)=>{
        if(err){
          this.message="读取流失败："+err.message
        }else{
          //将 buf 转化成字符串展示
          this.message="读取流成功："+String.fromCharCode.apply(null,new Uint8Array(buf.slice(0,readLen)))
        }
      })


    }catch(err){
      this.message="读取失败："+err
    }
  }

  //复制文件--方法1
  fsCopyFile1() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    let dstDir=context.cacheDir+"/aaa.text"//复制的目录
    fs.copyFile(fileDir,dstDir).then((data)=>{
      this.message="复制成功1"
    }).catch(err=>{
      this.message="复制失败1"+err.message
    })
  }

  //复制文件--方法2  先打开文件，后复制
  fsCopyFile2() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    let dstDir=context.cacheDir+"/bbb.text"//复制的目录
    fs.open(fileDir,fs.OpenMode.READ_WRITE|fs.OpenMode.CREATE).then((file)=>{
      fs.copyFile(file.fd,dstDir).then((data)=>{
        this.message="复制成功2"
      }).catch(err=>{
        this.message="复制失败2"+err.message
      })
    }).catch(err=>{
      this.message="打开文件失败2"+err.message
    })

  }

  //创建目录
  fsMkdir() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/abc"//文件目录
    fs.mkdir(fileDir).then(()=>{
      this.message="创建目录成功"
    }).catch(err=>{
      this.message="创建目录失败"+err.message
    })
  }

  //删除目录
  fsRmdir() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/abc"//文件目录
    fs.rmdir(fileDir).then(()=>{
      this.message="删除目录成功"
    }).catch(err=>{
      this.message="删除目录失败"+err.message
    })
  }

  //删除文件
  fsUnlink() {
    let context:Context=getContext(this) as Context;
    let fileDir=context.filesDir+"/text.txt"//文件目录
    fs.unlink(fileDir).then(()=>{
      this.message="删除文件成功"
    }).catch(err=>{
      this.message="删除文件失败"+err.message
    })
  }

  @Styles CommonStyle(){
    .width("80%")
    .height(40)
  }

  build() {
    Scroll(){
      Column({space:10}) {
        Text(this.message).fontSize(30)

        Button("获取文件统一资源标志符")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.getUri()
          })
        Button("获取文件详细属性信息")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsStat()
          })
        Button("检查文件是否存在")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsAccess()
          })
        Button("打开创建文件")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsOpen()
          })
        Button("写入文件并关闭文件流")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsWrite()
          })
        Button("读取Text文件")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsReadText()
          })
        Button("读取文件流")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsReadFile()
          })

        Button("复制文件-方法1")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsCopyFile1()
          })

        Button("复制文件-方法2")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsCopyFile2()
          })

        Button("创建目录")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsMkdir()
          })

        Button("删除目录")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsRmdir()
          })

        Button("删除文件")
          .CommonStyle()
          .onClick((event: ClickEvent) => {
            this.fsUnlink()
          })

      }
      .width('100%')
    }

  }
}