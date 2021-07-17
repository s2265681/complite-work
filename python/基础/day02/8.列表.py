# coding=utf-8

# 6.2 列表 可变

# 6.2.1 创建列表  1、list(iterable) 函数  2、[元素1，元素2，元素3...]

a = list('Hello')
b = ['H', 'e', 'l', 'l', 'o']
print(a)  #['H', 'e', 'l', 'l', 'o']
print(b)
print(a==b)  # True
print(a[4])

# 6.2.2 追加元素   1、 [].append(x)  2、 (+)方法  =  extend(t) 方法

L = [1,2,3]
L.append(1)
print(L) # [1, 2, 3, 1]
L+=[4,5,6]
print(L)  # [1, 2, 3, 1, 4, 5, 6]
L.extend([9])
print(L) # [1, 2, 3, 1, 4, 5, 6, 9]

# 6.2.3 插入元素 [].insert(i,x)
L.insert(7,7)
L.insert(8,8) 
print(L) # [1, 2, 3, 1, 4, 5, 6, 7, 8, 9]

# 6.2.4 替换元素  下标索引  =  赋值
L[3] = 10
print(L) #  [1, 2, 3, 10, 4, 5, 6, 7, 8, 9]

# 删除元素 [].remove(x)  多个删除第一个
L.remove(10)  
print(L) #[1, 2, 3, 4, 5, 6, 7, 8, 9]
