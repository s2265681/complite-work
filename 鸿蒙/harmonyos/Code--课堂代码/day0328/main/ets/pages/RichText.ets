@Entry
@Component
struct RichTextA {
  @State dataHtml:string=`<html>
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
      Scroll(){
        RichText(this.dataHtml)
          .onComplete(()=>{
            //页面解析完成后，可以做的操作
          })
      }
    }
    .width('100%')
    .height('100%')
  }
}