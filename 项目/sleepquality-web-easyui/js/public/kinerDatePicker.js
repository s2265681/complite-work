;(function (win,doc) {
    var now = new Date();
    var defaultSetting = {
        startDate: now,
        endDate: now,
        clickMaskHide: true,
        swiperOptions: {
            direction : 'vertical',
            centeredSlides: true,
            slidesPerView: 5,
            slideToClickedSlide: true
        }
    };

    function createId() {
        var id = parseInt(new Date().getTime()+Math.random()*999999999);
        return "kinerDatePicker_"+id;
    }
    
    var tpl = '<div class="kinerDatePicker-container">' +
        '      <div class="kdp-mask"></div>' +
        '      <div class="kdp-box">' +
        '        <div class="kdp-header-container">' +
        '          <div class="kdp-title"></div>' +
        '          <div class="kdp-cancel-btn">取消</div>' +
        '          <div class="kdp-ok-btn">    确定</div>' +
        '        </div>' +
        '        <div class="kdp-content-container">' +
        '          <div class="year-container">' +
        '            <div class="year-swiper-container">' +
        '              <div class="swiper-wrapper">' +
        '              </div>' +
        '            </div>' +
        '          </div>' +
        '          <div class="month-container">' +
        '            <div class="month-swiper-container">' +
        '              <div class="swiper-wrapper">' +
        '              </div>' +
        '            </div>' +
        '          </div>' +
        '          <div class="date-container">' +
        '            <div class="date-swiper-container">' +
        '              <div class="swiper-wrapper">' +
        '              </div>' +
        '            </div>' +
        '          </div>' +
        '        </div>' +
        '      </div>' +
        '    </div>'

    $.fn.kinerDatePicker = function (opts) {
        var opt = $.extend(true,{},defaultSetting,opts);

        return $(this).each(function (index,item) {
            $(item).attr({'readonly': true,"unselectable": "on"}).focus(function () {
                $(this).blur()
            });
            var self = this;

            this.title = $(this).attr('title');
            this.startYear = $(this).attr('startYear');

            this.defaultVal = $(this).attr('default-val');
            this.defaultYear = parseInt(this.defaultVal.split('-')[0]);
            this.defaultMonth = parseInt(this.defaultVal.split('-')[1]);
            this.defaultDate = parseInt(this.defaultVal.split('-')[2]);


            this.container = $(tpl);
            this.pid = createId();
            this.container.attr('id',this.pid);
            $('body').append(this.container);

            // this.container.find('.kdp-title').text(this.title);

            var startYear = opt.startDate.getFullYear();

            if(this.startYear){
                startYear = this.startYear;
            }
            var endYear = opt.endDate.getFullYear();
            var year = endYear;
            var yearTpl = '';
            while (year>=startYear){
                yearTpl+=
                    '                <div class="swiper-slide" id="kdp_year_'+year+'">' +
                    '                  <div class="val" data-value="'+year+'">'+year+'</div>' +
                    '                </div>';
                year--;
            }


            this.container.find('.year-swiper-container .swiper-wrapper').html(yearTpl);

            var monthTpl = '';
            for(var i=1;i<=12;i++){
                monthTpl+=
                    '                <div class="swiper-slide" id="kdp_month_'+i+'">' +
                    '                  <div class="val" data-value="'+i+'">'+i+'</div>' +
                    '                </div>';
            }
            this.container.find('.month-swiper-container .swiper-wrapper').html(monthTpl);
            function initDate(len){
                var dateTpl = '';
                for(var i=1;i<=len;i++){
                    dateTpl+=
                        '                <div class="swiper-slide" id="kdp_date_'+i+'">' +
                        '                  <div class="val" data-value="'+i+'">'+i+'</div>' +
                        '                </div>';
                }
                self.container.find('.date-swiper-container .swiper-wrapper').html(dateTpl);
                if(self.dateSwiper){
                    self.dateSwiper.destroy(true);
                    self.dateSwiper = new Swiper('#'+self.pid+' .date-swiper-container',$.extend(true,{},opt.swiperOptions,{
                        onSlideChangeEnd: function (swiper) {
                            var val = fixNum($(swiper.slides[swiper.activeIndex]).find('.val').data('value'));
                            self.selectedDate =  val;
                            opt.changeHandler&&opt.changeHandler([self.selectedYear,self.selectedMonth,self.selectedDate],self);
                        }
                    }));
                }

            }

            initDate(new Date(endYear,1,0).getDate());

            function fixNum(num){
                return num>=10?num+"":"0"+num;
            }




            // this.selectedYear = this.defaultYear || endYear,this.selectedMonth = fixNum(this.defaultMonth) || '01',this.selectedDate = fixNum(this.defaultDate) || '01';

            if(this.defaultYear){
                var initIndex1 = $('#kdp_year_'+this.defaultYear).index();
            }
            if(this.defaultMonth){
                var initIndex2 = $('#kdp_month_'+this.defaultMonth).index();
            }
            if(this.defaultDate){
                var initIndex3 = $('#kdp_date_'+this.defaultDate).index();
            }


            // console.log(initIndex1, initIndex2, initIndex3);


            function hide(){
                $(self.container).find('.kdp-mask').fadeOut();
                $(self.container).find('.kdp-box').animate({
                    bottom: -$(win).height()
                },function () {
                    $(self.container).css({
                        display: 'none'
                    })
                    opt.hideHandler&&opt.hideHandler(self);
                });
            }

            function show(){
                $(self.container).find('.kdp-mask').fadeIn();
                if(self.yearSwiper){

                    $(self.container).css({
                        display: 'block'
                    }).find('.kdp-box').animate({
                        bottom: 0
                    });
                }else{
                    $(self.container).css({
                        display: 'block'
                    });
                    self.yearSwiper = new Swiper('#'+self.pid+' .year-swiper-container',$.extend(true,{},opt.swiperOptions,{
                        initialSlide:initIndex1,
                        onSlideChangeEnd: function (swiper) {
                            var val = $(swiper.slides[swiper.activeIndex]).find('.val').data('value')+"";
                            self.selectedYear =  val;
                            if(self.monthSwiper&&self.dateSwiper){
                                self.selectedMonth = fixNum($(self.monthSwiper.slides[self.monthSwiper.activeIndex]).find('.val').data('value')+"");

                                // self.dateSwiper.removeAllSlides();

                                initDate(new Date(parseInt(val),parseInt(self.selectedMonth),0).getDate());

                                self.selectedDate = fixNum($(self.dateSwiper.slides[self.dateSwiper.activeIndex]).find('.val').data('value')+"");
                                opt.changeHandler&&opt.changeHandler([self.selectedYear,self.selectedMonth,self.selectedDate],self);
                            }

                        }
                    }));
                    self.monthSwiper = new Swiper('#'+self.pid+' .month-swiper-container',$.extend(true,{},opt.swiperOptions,{
                        initialSlide:initIndex2,
                        onSlideChangeEnd: function (swiper) {

                            var val = $(swiper.slides[swiper.activeIndex]).find('.val').data('value');
                            self.selectedMonth =  fixNum(val);
                            if(self.yearSwiper&&self.dateSwiper){
                                self.selectedYear =  $(self.yearSwiper.slides[self.yearSwiper.activeIndex]).find('.val').data('value')+"";
                                initDate(new Date(parseInt(self.selectedYear),parseInt(self.selectedMonth),0).getDate());
                                self.selectedDate = fixNum($(self.dateSwiper.slides[self.dateSwiper.activeIndex]).find('.val').data('value')+"");
                                opt.changeHandler&&opt.changeHandler([self.selectedYear,self.selectedMonth,self.selectedDate],self);
                            }

                        }
                    }));
                    self.dateSwiper = new Swiper('#'+self.pid+' .date-swiper-container',$.extend(true,{},opt.swiperOptions,{
                        initialSlide:initIndex3,
                        onSlideChangeEnd: function (swiper) {
                            var val = $(swiper.slides[swiper.activeIndex]).find('.val').data('value');
                            self.selectedDate =  fixNum(val);
                            if(self.yearSwiper&&self.monthSwiper){
                                self.selectedYear =  $(self.yearSwiper.slides[self.yearSwiper.activeIndex]).find('.val').data('value')+"";
                                self.selectedMonth = fixNum($(self.monthSwiper.slides[self.monthSwiper.activeIndex]).find('.val').data('value')+"");

                                opt.changeHandler&&opt.changeHandler([self.selectedYear,self.selectedMonth,self.selectedDate],self);
                            }

                        }
                    }));




                    $(self.container).find('.kdp-box').animate({
                        bottom: 0
                    });
                }

                opt.showHandler&&opt.showHandler(self);


            }

            $(self).click(function () {
                show();
            });
            if(opt.clickMaskHide){
                this.container.find('.kdp-mask').click(function () {
                    hide();
                });
            }

            this.container.find('.kdp-cancel-btn').click(function () {
                hide();
                opt.cancelHandler&&opt.cancelHandler(self);
            });
            this.container.find('.kdp-ok-btn').click(function () {

                var year = self.selectedYear||"",month = self.selectedMonth||"01",date = self.selectedDate||"01";

                $(self).html(year+"-"+month+"-"+date).addClass('hasValue');
                $(self).attr({
                    "year-val": year||"",
                    "month-val": month||"",
                    "date-val": date||"",
                    "format-val": year+"-"+month+"-"+date||""
                });
                opt.okHandler&&opt.okHandler([year,month,date],self);
                hide();
            });
            $(self).getValue = function () {
                console.log("获取时间选择结果");
            }


        })
    };
    $.fn.kinerDatePickerVal = function(){
        var yearVal = $(this).attr('year-val')||"";
        var monthVal = $(this).attr('month-val')||"";
        var dateVal = $(this).attr('date-val')||"";
        var formatVal = $(this).attr('format-val')||"";
        return [yearVal,monthVal,dateVal,formatVal];
    }

})(window,document);