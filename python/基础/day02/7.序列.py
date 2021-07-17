# coding=utf-8

# 6.1 序列： 可迭代、有序的容器类型的数据。（字符串、元祖、列表、字节序列）

# 索引0 正值索引 从前往后
# 负值索引 从后往前
# 注意索引越界异常

a = "Hello"
print(a[0])
print(a[-1])


# 6.1.2  加和乘操作 
print("Hello" + " World")
print("Hello" * 2)



# 6.1.3  切片操作 [start:end:step]  step正数是从左往右切， 负数为相反  含左不含右

print("Hello"[0:3])
print("Hello"[0:4:2])


# 6.1.4 成员测试  in  not in 

print("H" in "Hello")
print("a" in "Hello")