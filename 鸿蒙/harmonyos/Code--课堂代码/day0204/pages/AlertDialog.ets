@Entry
@Component
struct Index {
 //预置弹窗
  build() {
    Column() {
      Button("警告弹窗").onClick(()=>{
        AlertDialog.show({
          title:"操作提示",
          message:"你确定要删除吗？",
          autoCancel:false,//是否点击遮罩层关闭
          alignment:DialogAlignment.Bottom,
          offset:{dx:0,dy:-20},
          gridCount:3,
          //双按钮
          primaryButton:{
              value:"确定",
              action:()=>{//回调函数
                console.log("ok")
              },
              fontColor:"#f00"
          },
          secondaryButton:{
              value:"取消",
              action:()=>{//回调函数
                console.log("取消")
              },
              fontColor:"#00f"
          }
          //单个按钮
          // confirm:{
          //   value:"确定",
          //   action:()=>{//回调函数
          //     console.log("ok")
          //   },
          //   fontColor:"#00f"
          // }
        })
      })

      Button("列表选择弹窗").onClick(()=>{
        ActionSheet.show({
          title: '请选择水果',
          message: '水果信息',
          autoCancel: true,
          confirm: {
            value: '确认按钮',
            action: () => {
              console.log('确认点击成功')
            }
          },
          cancel: () => {
            console.log('你点击了关闭')
          },
          alignment: DialogAlignment.Bottom,
          offset: { dx: 0, dy: -20 },
          sheets: [
            {
              title: 'apples',
              action: () => {
                console.log('apples')
              }
            },
            {
              title: 'bananas',
              action: () => {
                console.log('bananas')
              }
            },
            {
              title: 'pears',
              action: () => {
                console.log('pears')
              }
            }
          ]
        })
      })

      Button("日期滑动选择器").onClick(()=>{
        DatePickerDialog.show({
          start:new Date("2000-1-1"),
          end:new Date("2100-1-1"),
          selected:new Date("2024-1-1"),
          lunar:true,//true 阴历
          onCancel:()=>{//取消
            console.log("取消");
          },
          onChange:(value:DatePickerResult)=>{//选项发生改变
             console.log(`${value.year}--${value.month}--${value.day}`)
          },
          onAccept:(value:DatePickerResult)=>{//确定
            console.log(`${value.year}--${value.month}--${value.day}`)
          }
        })
      })

      Button("TimePickerDialog 12小时制")
        .margin(20)
        .onClick(() => {
          TimePickerDialog.show({
            selected: new Date("2024-1-1 12:00:00"),
            useMilitaryTime:true,//24小时
            onAccept: (value: TimePickerResult) => {
              console.info("TimePickerDialog:onAccept()" + JSON.stringify(value))
            },
            onCancel: () => {
              console.info("TimePickerDialog:onCancel()")
            },
            onChange: (value: TimePickerResult) => {
              console.info("TimePickerDialog:onChange()" + JSON.stringify(value))
            }
          })
        })


      Button("文本滑动选择器")
        .margin(20)
        .onClick(() => {
          TextPickerDialog.show({
            range: this.fruits,
            selected: this.select,
            onAccept: (value: TextPickerResult) => {
              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
              this.select = value.index
              console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
            },
            onCancel: () => {
              console.info("TextPickerDialog:onCancel()")
            },
            onChange: (value: TextPickerResult) => {
              console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
            }
          })
        })
    }.width('100%')
    .height('100%')
  }
}