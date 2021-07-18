# coding=utf-8

#* 9.1 面向对象
 #todo  面向对象是一种编程思想， 即按照真实世界的思维方式构建软件系统

#* 9.2 定义类 class 括号内如果有继承父类，没有默认继承object父类， object是所有类的祖宗
#* pass 意思是保持类的完整，占用位置， 不会出现语法问题
# todo  例子
class Car(object):
    # 类体
    pass

 #?  print(Car) # <class '__main__.Car'>


#* 9.3 创建对象  类是对象加工厂
#! 没想好写什么时，通过pass来进行占位。

# todo  例子
class Car(object):
    # 类体
    pass

car = Car()
#? print(car)  #todo  <__main__.Car object at 0x109c374d0>


#* 9.4 类的成员
# todo 实例变量、构造方法、构造函数、实例变量、类变量、类方法

#* 9.41 实例变量
#todo  实例变量就是对象个体特有的"数据"

#* 9.4.2 构造方法
# todo 类中的__init__ () 方法是一个非常特殊的方法，用来创建和初始化实例变量，这种方法就是 "构造方法"  
#! self 当前对象， 调用的时候不用传递

class Dog:
    def __init__(self,name,age):
        self.name = name #? 创建和初始化实例变量name
        self.age = age #? 创建和初始化实例变量age

d = Dog('球球',2)
#? print('我们家的狗叫{0},{1}岁了。'.format(d.name,d.age)) #todo 我们家的狗叫球球,2岁了。

#* 9.4.3 实例方法
#todo 实力方法和实例变量一个，都是某个实例(或对象) 个体特有的方法

class Dog:
    def __init__(self,name,age):
        self.name = name #? 创建和初始化实例变量name
        self.age = age #? 创建和初始化实例变量age
    def run(self):
        print("{}在跑...".format(self.name)) #? 球球再跑
    
d = Dog('球球',2)
print('我们家的狗叫{0},{1}岁了。'.format(d.name,d.age)) #todo 我们家的狗叫球球,2岁了。
d.run()

#* 9.4.4 类变量 —— 类变量是属于类的变量，不属于单个对象, 
#* 9.4.5 类方法 —— 类方法是属于类的方法，不属于单个对象, 
#! 只能通过类名调用，不能通过实例调用, 类似于实例对象

class Account:
    #* 类变量
    interest_rate = 0.0568  #? 类变量： 利率 interest_rate  

    def __init__(self,owner,amount):
        self.owner = owner
        self.amount = amount

    #* 类方法 调用类方法也不用管cls
    @classmethod
    def interest_by(cls,amt):
        return cls.interest_rate * amt

        
account = Account('Tony',8000.0)

print('账户名:{0}'.format(account.owner))
print('账户余额:{0}'.format(account.amount))
print('利率:{0:0.1f}'.format(Account.interest_rate))
print(Account.interest_by(12.32333)) #? 0.699965144

