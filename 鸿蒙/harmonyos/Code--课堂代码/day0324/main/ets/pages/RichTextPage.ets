@Entry
@Component
struct RichTextPage {
  @State message: string = `
<html>
	<head>
		<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta charset="UTF-8"/>
		<title></title>
		<style type="text/css">
			h1{
				text-align: center;
				font-size: 26px;
				border-bottom: 1px solid #eee;
				padding: 10px 5px;
			}
		</style>
	</head>
	<body>
		<h1 class="title">
			这是一个html页面
		</h1>
	</body>
</html>`

  build() {
    Column() {
      //注意：嵌入的页面 无法滚动
      Scroll() {
       RichText(this.message)
         .onComplete(()=>{
           // 嵌入完成后的操作
         })
      }

    }
    .width('100%')
    .height('100%')
  }
}