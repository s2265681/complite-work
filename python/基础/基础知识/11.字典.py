# coding=utf-8

# 6.5 字典 (dict) 是可迭代的、通过键值对出现的  键视图不能包含重复，值视图可以重复

# 1、 dict() 函数创建  2、{key1:value, key2:value}

a = {101:'zhangsan',102:'lisi'}
b = dict({101:'zhangsan',102:'lisi'})
c = dict([(101,'zhangsan'),(102,'lisi')]) 
d = dict(((101,'zhangsan'),(102,'lisi'))) 
e = zip([101,102],['zhangsan','lisi']) 
print(a,b,c,d,a,a==b==c==d) # ({101: 'zhangsan', 102: 'lisi'}, {101: 'zhangsan', 102: 'lisi'}, {101: 'zhangsan', 102: 'lisi'}, True)


# 2、修改字典
a[101] = 'wangwu'
print(a) # {101: 'wangwu', 102: 'lisi'}

# 3、删除字典  pop
a.pop(102)
print(a) # {101: 'wangwu'}


# 4、 访问字典视图 

# - items()
# - keys()
# - values()
p = {101:'张三',102:'李四'}
print(list(p.items()))  # [(101, '\xe5\xbc\xa0\xe4\xb8\x89'), (102, '\xe6\x9d\x8e\xe5\x9b\x9b')]
print(list(p.keys()))  # [101,102]
print(list(p.values())) # ['张三','李四']