
# coding=utf-8

#* JSON 数据

#* JSON数据需要转化成python数据才可以用，叫解码过程 decode

'''
-  JSON    Python
   对象     字典
   数组     列表
   字符串   字符串
   整数数字  整数
   实数     浮点
   true    True
   false   False
   null    None
'''


#* json模块提供了loads(str) 函数进行JSON数据的解码，参数str是JSON字符串，返回Python
#! python中无法直接使用json，需要转化成python语言

'''
 import json
 json_data = {'key1':'value1','key2':'value2'}
 py_dict = json.loads(json_data)
 value1 = py_dict['key1']
 value2 = py_dict['key2']
'''
