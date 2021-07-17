# coding=utf-8

# 6 种内置数据类型 数字、字符串、列表、元组、集合和字典

# 4种数字类型： 整数类型、浮点类型、复数类型、布尔类型


# 整数类型 int类 <type 'int'>
a = 10
type(10)

# 浮点类型 <type 'float'>
b = 10.11
type(b)

# 复数类型 <type 'complex'>
c= 1 + 2j
type(c)

# 布尔类型  整数类型的子类 <type 'bool'>
d  = True
type(d)

bool(0)  # False
bool(' ') # True
bool('') # False
bool([]) # False
bool({}) # False

# 隐式转换 整数+布尔转换成整数、浮点加整数转换成浮点、 整数+浮点+布尔转换成浮点
1 + True # 2
1.0 + 1  # 2.0
1.0 + True  # 2.0
1 + 1.0 + True  # 3.0

# 显式转换 通过int、float、bool 强制转换

l = 1.0 + True
int(l)
int(0.6) # 0
int(True) # 1

