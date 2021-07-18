# coding=utf-8


#todo 10.4 自定义异常类

#? 继承官方提供的异常类
class ZhiException(Exception):
    def __init__(self,message):
        super(ZhiException,self).__init__(message)
        print('异常哈哈哈')

# todo 10.5 手动引发异常

i = input("请输入数字: ")
n = 8888
try:
    i2 = int(i)
    try:
        result = n / i2
        print(result)
        print("{0}除以{1}等于{2}".format(n,i,result))
    except ZeroDivisionError as e:  # except
        # print("异常发生:{}".format(e))
        raise ZhiException("异常发生")
except ValueError as e2:
    # print("输入的是无效数字,异常:{}".format(e2))
    raise ZhiException("输入的是无效数字")
finally:
    # 释放代码
    print('释放资源') #? 释放资源
