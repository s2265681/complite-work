# coding=utf-8

# todo 主要学习内容
#* 异常捕获 ——  当异常的时候 提醒用户  而不是让程序中断
#* 使用
#* 自定义异常类
#* 手动引发异常


#todo 10.1 第一个异常： 除零异常

'''
i = input("请输入数字: ")
n = 8888
result = n / int(i)
print(result)
'''

#todo 10.2 捕获异常  try-except 、 


#* 10.2.1 try-except[异常类型(可省)] 语句
#* 10.2.2 多个 except 代码块

'''
i = input("请输入数字: ")
n = 8888
try:
    result = n / int(i)
    print(result)
    print("{0}除以{1}等于{2}".format(n,i,result))
except ZeroDivisionError as e:  # except
    print("不能除以0，异常:{}".format(e))
except ValueError as e:  # except 
    print("输入的是无效数字，异常:{}".format(e))  #! "dsdd" 输入的是无效数字，异常:invalid literal for int() with base 10: 'dsdd'
except:  # except
    print("请输入数字")
'''

#todo 10.2.3 多重异常捕获 错误类型放到一起

'''
i = input("请输入数字: ")
n = 8888
try:
    result = n / int(i)
    print(result)
    print("{0}除以{1}等于{2}".format(n,i,result))
except (ZeroDivisionError,ValueError) as e:  # except
    print("异常发生:{}".format(e))
except:  # except
    print("请输入数字")
'''

    
#todo 10.2.4 tru-except 语句嵌套

'''
i = input("请输入数字: ")
n = 8888
#! 先捕获是不是有效数字的异常，如果没有异常，在进行下面的语句
try:
    i2 = int(i)
    try:
        result = n / i2
        print(result)
        print("{0}除以{1}等于{2}".format(n,i,result))
    except ZeroDivisionError as e:  # except
        print("异常发生:{}".format(e))
except ValueError as e2:
    print("输入的是无效数字,异常:{}".format(e2))
'''

#todo 10.3 finally 释放代码块

i = input("请输入数字: ")
n = 8888
try:
    i2 = int(i)
    try:
        result = n / i2
        print(result)
        print("{0}除以{1}等于{2}".format(n,i,result))
    except ZeroDivisionError as e:  # except
        print("异常发生:{}".format(e))
except ValueError as e2:
    print("输入的是无效数字,异常:{}".format(e2))

finally:
    # 释放代码
    print('释放资源') #? 释放资源