# coding=utf-8

# 6.4 集合（set） 是一种可迭代的、无序的、不能包含重复元素的容器类型的数据。 集合是无序的不能重复的 {}

# 6.4.1 创建集合 1、set(iterable)函数  2、{元素1，元素2，元素3...}

print(set("Hello"))  # set(['H', 'e', 'l', 'o'])  已经去掉重复了， 没有顺序概念 没有序号
print(type(set("Hello"))) # <type 'set'>
print(type({})) # <type 'dict'>   注意 {} 空的是属于字典的  有值才属于set集合
print(type({1,2,3})) # <type 'set'>

# 6.4.2 修改集合

# - add(elem)  添加元素 如果存在则不添加 不会抛出错误
# - remove(ele) 删除元素， 如果元素不存在 ， 则抛出错误
# - clear() 清楚集合

name = {"L","i"}  
name.add("ss") # set(['i', 'ss', 'L'])
name.remove("i") # set(['ss', 'L'])
print("i" in name)  # False
name.clear()  # set([])
print(name)
