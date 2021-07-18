# coding=utf-8

#*  7.1 字符串的表示方式

#*  7.1.1 普通字符串
a = 'hello'
A = "HELLO"

## 转意符
'''
\n 换行
\r 回车
\" 双引号
\' 单引号
\\ 反斜杠

'''

# 7.1.2 原始字符串 r开头 字符串就是原始字符串 在正则表达式很有用
originString = r'Hello\nworld'
print(originString) # Hello\nworld


#*  7.1.3 长字符串 (三重单引号或双引号)

mutiString = """
    《诗》
的时代的速度速度
大大大大大阿达的
"""
print(mutiString)

#* 7.2 字符串数字互换
#! 字符串转换成数字： int() float()


print(float("80.0")) # 80.0
print(int('AB',16))  # 171


#*  7.2.2 数字转换成字符串

str(123)  # '123'
str(12.2323)  # '12.2323'


#* 7.3 格式化字符串 str.format() 
#? 使用字符串的format(),可以格式化和字符串拼接

#* 7.3.1 使用占位符 {} 

'''
 默认占位符
 "i*i={}".format(i*i)
 "i*i = 1024"

 参数序号占位符
 s = "{0} * {0} = {1}".format(i,i*i)

 参数名占位符
 s1 = "{p1} * {p1} = {p2}".format(p1 = i, p2 = i*i)
'''

i = 32
print("i*i={}".format(i*i)) # i*i=1024
s = "{0} * {0} = {1}".format(i,i*i)
print(s) # 32 * 32 = 1024

s1 = "{p1} * {p1} = {p2}".format(p1 = i, p2 = i*i)
print(s1)  # 32 * 32 = 1024


#* 格式控制符
#! {1:d} 注意之间不能有空格

'''
 s 字符串
 d 十进制整数
 f、F十进制浮点数
 g、G十进制整数或浮点数
 e、E科学计数法
'''

money = 5834.5678
name = 'Tony'
r = '{0:s}年龄{1:d},工资是{2:f}元。'.format(name,20,money)
print(r) # Tony年龄20,工资是5834.567800元。
r1 = '{0:s}年龄{1:d},工资是{2:0.2f}元。'.format(name,20,money)
print(r1) # Tony年龄20,工资是5834.57元。


#* 字符串方法

#? 7.4.1 字符串查找 str.find(sub,start[,end]) 查找字符串，找到返回索引，没有返回-1

print("hello world".find('t')) # -1
print("hello world".find('d',0,4)) # -1
print("hello world".find('d',0,11)) # 10

#? 7.4.2 字符串替换   str.replace(sub,target,count)
text = 'AB CD EF GH IJ'
print(text.replace(' ', '|' , 2)) # AB|CD|EF GH IJ
print(text.replace(' ', '|')) # AB|CD|EF|GH|IJ

#? 7.4.3 字符串分割  str.split(sep=None,maxsplit=-1)  maxsplit最大分割次数，不写为不限制

text = 'AB CD EF GH IJ'
print(text.split(' ')) # ['AB', 'CD', 'EF', 'GH', 'IJ']
print(text.split(' ',2)) # ['AB', 'CD', 'EF GH IJ']  分成两份