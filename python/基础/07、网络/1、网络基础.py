# coding=utf-8

#* 14.1.1 TCP/IP

#* TCP/IP 由TCP和IP构成 ， IP是一种低级的路由协议，无法保证所有包到达目的的，也不能包按顺序到达，TCP能狗保证数据包安全弟按照大宋时的顺序送达目的地

#* IP地址： 每个计算机标识， TCP/IP使用IP地址来标示源地址和目标

#* 14.1.3 端口 ： 保证多网络程序运行

#* HTTP/HTTPS

#* HTTP是无连接协议，每次请求简历链接。服务器处理完后，先应答客户端，然后断开链接，不会一直占用网络资源

#* HTTPS 进行来SSH加密， 默认443端口

#* GET 发送信息显示，少量  查询 不安全 POST： 请求体内 数据量大 相对安全

#* 搭建web服务
# python /Users/shangjiawei/Desktop/complite-work/python/基础/07、网络/1、网络基础.py
import urllib.request
import json

url = 'http://localhost:3001/list'

req = urllib.request.Request(url)

#! with 代码块可以自动释放资源
with urllib.request.urlopen(req) as response:  #! 创建Request对象，默认GET请求 response是返回的对象
    data = response.read() #! 数据转化成字节序列数据 
    json_data = data.decode()  #! 解码转化成JSON数据
    print(json_data)  #? {"CDate":"2021-07-21","Content":"发布python","UserID":"tony","ID":"10"}

#* 发送post请求
#? 准备参数
params_dict = {
    'action':'query',
    'id':10
}
#? 将字典参数转化成字符串，格式为action=query&id=10
params_str = urllib.parse.urlencode(params_dict)
print(params_str)
#? 字符串转换成字节序列对象
params_bytes = params_str.encode()

req = urllib.request.Request(url, data=params_bytes) #! 发送POST请求
with urllib.request.urlopen(req) as response:
    data = response.read()
    json_data = data.decode()
    print(type(json_data)) #! <class 'str'> class 中没有json格式 需要转化成字典
    py_dict = json.loads(json_data) #! JSON 转化成字典
    print(py_dict['methods'])
