# coding=utf-8

#* 函数

#* 8.5 函数的作用域
# 创建全局变量x
x = 10
def print_vaue():
    global x
    x = 12
    print(x)

print_vaue()
# print('全局变量x={0}'.format(x))


#* 8.6 函数类型 function 
# 任意一个函数都有数据类型，一个函数可以作为另一个函数的返回值、函数参数使用

def add(a,b):
    return a + b

def sub(a,b):
    return a - b

def square(a):
    return a * a
    
# 定义计算函数
def calc(opr):
    if opr == '+':
        return add
    else:
        return sub

f1 = calc('+')
f2 = calc('-')
# print("10+5={0:d}".format(f1(10,5))) # 10+5=15
# print("10-5={0:0.1f}".format(f2(10,5))) # 10-5=5



#* 8.6.2 过滤函数filter
list = range(10)
def fiterFun(x):
    return x > 5 # 过滤大于5的

filtered = filter(fiterFun,list)
# print(filtered,type(filtered)) # ([6, 7, 8, 9], <type 'list'>)

#*  8.6.1 映射函数map

def f1(x):
    return x * 2 

arr = range(5)
newarr = map(f1,arr)
# print(newarr) # [0, 2, 4, 6, 8]


#* 8.7 lambda 函数  （匿名函数） lambda  参数列表 :  参数体
# lambda 定义匿名函数。 lambda关键字定义的函数也称为lambda函数

def calc(opr):
    if opr == '+':
        return lambda a,b : (a + b) # 替代add函数
    else:
        return lambda a,b : (a - b) # 替代add函数
# print(calc('+')(1,2)) # 3

#?  lambda 函数filter写法
array = range(10)
print(filter(lambda x: x>5,array)) # [6, 7, 8, 9]

#? lambda 函数map写法
print(map(lambda x: x*2,array))  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
