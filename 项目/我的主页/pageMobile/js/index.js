
$(document).ready(function(){
    $(".l1").mouseenter(function(){
        $(".icon1").css("background","#f00");
    $('#s1').animate({
         left: -217
    },300) 
    });
    $(".l1").mouseleave(function(){
        $(".icon1").css("background","#959595");
    $('#s1').animate({
         left: -88
    },300)
    });
  });


  $(document).ready(function(){
    $(".l2").mouseenter(function(){
          $(".wxcode").fadeIn(100);
    });
    $(".l2").mouseleave(function(){
          $(".wxcode").fadeOut(100);
    });
  });

// 代码检测  网站统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?bf4c7e8c450ed433cc44d3868eeb32a0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


// 解决滚动时兼容性bug问题
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isUc = u.indexOf('UCBrowser') > -1;    //uc浏览器
//var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isAndroid&&isUc){		/*注释5*/
  $('.box').on('touchstart',function(){
  $(document).on('touchmove',function(e){
      e.preventDefault();
  });
  $(document).on('touchend',function(){
      $(document).unbind();
  });
    });
}

// 解决轮播图 移动端不能左右滑动的问题
// 获取手指在轮播图元素上的一个滑动方向（左右）
    // 获取界面上轮播图容器
    var $carousels = $('.carousel');
    var startX,endX;
    // 在滑动的一定范围内，才切换图片
    var offset = 50;
    // 注册滑动事件
    $carousels.on('touchstart',function (e) {
        // 手指触摸开始时记录一下手指所在的坐标x
        startX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchmove',function (e) {
        // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend',function (e) {
        //console.log(endX);
        //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
        //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
        var distance = Math.abs(startX - endX);
        if (distance > offset){
            //说明有方向的变化
            //根据获得的方向 判断是上一张还是下一张出现
            $(this).carousel(startX >endX ? 'next':'prev');
            // console.log('132132123')
        }
   })




