import promptAction from '@ohos.promptAction'
@Entry
@Component
struct Index {

  build() {
    Column() {
      //API弹窗---3---自动导入一个文件(@ohos.promptAction)
      //预置弹窗

      //1 提示弹窗
      // Button("提示弹窗").onClick(()=>{
      //   promptAction.showToast({
      //     message:"恭喜你，提交成功",
      //     duration:2000,
      //     bottom:200//距离底部的位置
      //   })
      // })

      //2 对话框
      // Button("对话弹窗").onClick(()=>{
      //   promptAction.showDialog({
      //     title:"你确定删除吗？",
      //     message:"删除后，将丧失部分权限",
      //     buttons:[
      //       {
      //         text:"确定",
      //         color:"#00f"
      //       },
      //       {
      //         text:"取消",
      //         color:"#f00"
      //       }
      //     ]
      //   }).then((data)=>{
      //     //成功 0   取消1
      //     console.log(`${data.index}`)
      //   }).catch((err)=>{
      //     //遮罩层
      //     console.log("失败",err)
      //   })
      // })

      Button("菜单弹窗").onClick(()=>{
        promptAction.showActionMenu({
          title:"选择水果",
          buttons:[
            {
              text:"苹果",
              color:"#f00"
            },
            {
              text:"橙子",
              color:"#f0f"
            },
            {
              text:"香蕉",
              color:"#ff0"
            }
          ]
        })
      })

    }.width('100%')
    .height('100%')
  }
}