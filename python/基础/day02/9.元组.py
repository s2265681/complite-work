# coding=utf-8

# 6.3 元祖 不可变  tuple  1、tuple([1,2,3])   2、(1,2,3)  3、注意1,也是元祖

tuple1 = tuple([1,2,3]) 
tuple2 = (1,2,3)

print(tuple1,tuple2,tuple1==tuple2) # ((1, 2, 3), (1, 2, 3), True)

a = 1,
print(type(a))  # <type 'tuple'>

# 6.3.2 元组拆包 1、打包 (102,'zhangsna')  2、拆包  s_id,s_name = (102,'zhangsna') 
s_id,s_name = (102,'zhangsna') 
print(s_id,s_name)  # 102 'zhangsan'