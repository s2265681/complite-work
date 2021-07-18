# coding=utf-8

# * 打开文件
# ? open(file,mode="r",encoding=None,errors=None)
# ? mode 打开模式 t: 文本模式打开  b：二进制模式打开  r：只读模式打开  w：只写模式  x： 不存在创建文件打开 a 追加模式打开 + 更新（读写模式）打开
# ? 常用组合  只读： rt或r   只写：wt或w  独占模式xt或x  追加at或a

# f = open('test.txt','w+')
# f.write('World')
# print('1、创建文件test.txt,world写入文件内容')

# f = open('test.txt','r+')
# f.write('Hello')
# print('2、打开文件test.txt,Hello写入文件内容')

# f = open('test.txt','a+')
# f.write('天天向上')
# print('3、打开文件test.txt,追加天天向上内容')


# * 12.2 关闭文件  close
# ? 在finally代码中关闭文件
f_name = '/Users/shangjiawei/Desktop/complite-work/test.txt'
f = None
try:
    f = open(f_name)
    print('打开文件成功')
    content = f.read()
    print(content)
except FileNotFoundError as e:
    print('文键不存在')
except OSError as e:
    print('处理OSError')
finally:
    if f is not None:
        f.close()
        print('关闭文件成功')

# ? 在with as代码中关闭文件   with as 提供了一个代码块，在as后面声明一个资源变量，在with as代码结束之后自动释放资源
f_name = '/Users/shangjiawei/Desktop/complite-work/test.txt'
f = None
with open(f_name) as f:
    content = f.read()
    print(content)
