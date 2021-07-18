# coding=utf-8
#* 日期时间模块 —— datetime 类

#todo 属性  year、month、day、hour、minute、second、microsecond、tzinfo

# import datetime #! datetime.datetime 
'''
from datetime import datetime
d = datetime(2020,2,12) #? 2020-02-12 00:00:00
print(d)
print(d.year)
'''


#todo 方法 today()  返回本地日期时间
'''
from datetime import datetime
d = datetime(2020,2,12) #? 2020-02-12 00:00:00
print(d.today())
print(d.now())
print(d.fromtimestamp(88899999))  #? 时间戳转换成时间
'''



#* date 类
import datetime
print(datetime.date(2020,1,16)) #?2020-01-16

#* time 类
# import datetime
print(datetime.time(23,59,58,3444)) #? 23:59:58.003444

#* timedelta 计算时间跨度类  参数 days=0、seconds=0 、micseconds = 0 、 week ....
print(datetime.date(2020,1,16)+datetime.timedelta(10)) #? 2020-01-26  加10天  第一个是day参数。。。。


#* 日期时间和字符串相互转换

#todo datetime、date、time 中都有 strftime(format)  将日期转化成字符串

#todo datetime.strptime(date_string,format) 进行日期解析

#? 日期和时间格式控制符

#? %m  两位月份表示 
#? %y  两位年份表示  08、18...
#? %Y  四位年份表示 
#? %d  月中的一天  如01、02...
#? %H  两位小时表示(24小时制)  00、01...
#? %M  两位分钟
#? %S  两位秒

import datetime
d = datetime.datetime.today()
print(d.strftime('%Y-%m-%d %H:%M:%S')) #?2021-07-18 17:15:17

str_date = "2021-07-18 17:15:17"
print(datetime.datetime.strptime(str_date, '%Y-%m-%d %H:%M:%S')) #? 2021-07-18 17:15:17

print(datetime.datetime(2020,2,29,10,40,26)) #? 2020-02-29 10:40:26