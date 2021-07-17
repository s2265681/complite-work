# coding=utf-8

#* 9.1 面向对象
# 面向对象是一种编程思想， 即按照真实世界的思维方式构建软件系统


#* 9.2 定义类 class 括号内如果有继承父类，没有默认继承object父类， object是所有类的祖宗
#* pass 意思是保持类的完整，占用位置， 不会出现语法问题

class Car(object):
    # 类体
    pass

# print(Car) # <class '__main__.Car'>


#* 9.3 创建对象  类是对象加工厂

class Car(object):
    # 类体
    pass

car = Car()
print(car) # <class '__main__.Car'>