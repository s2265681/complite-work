;(function (win, doc) {

    function dofix() {
        var defaultDpr = 2;
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        var dpr = window.devicePixelRatio;
        // alert(dpr);
        var winWidth = $(window).width(), winHeight = $(window).height();

        // alert(winWidth+"-"+winHeight+"-"+dpr);

        var screenHeight = 1386*(640/winWidth);

        // console.log(winHeight, screenHeight);

        if (winHeight >= screenHeight) {
            $('.viewContainer').addClass('full');
            $('.bg-container').css({
                height: '100%'
            });

            var offset = (winHeight-$('.content-container').height())/2;
            $('.content-container').css({
                // height: lib.flexible.px2rem(($('.content-container').height()+offset)+"px"),
                left: '50%',
                top: 0,
                transform: 'translate3d(-50%,0,0)'
            });
        } else {
            var offset = screenHeight - winHeight;



            $('.bg-container').css({
                'margin-top': lib.flexible.px2rem((-offset/2)+"px")
            });



            $('.content-container').css({
                left: '50%',
                top: '0',
                transform: 'translate3d(-50%,0,0)'
            });
            $('.content-container>.content').each(function () {
                var paddingTop = parseFloat($(this).css('padding-top'));
                // console.log(paddingTop,Math.abs(offset) / 2);

                $(this).css('padding-top',lib.flexible.px2rem((paddingTop-Math.abs(offset)/2)+"px"))
            })
        }
    }


    dofix();

})(window, document);