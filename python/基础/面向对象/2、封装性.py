# coding=utf-8

#* 三大特征 、 继承、封装、多态

#* 9.5 封装性

#! 封装隐藏了对象的内部细节，值保留有限的对外接口，外部调用者不用关系对象的内部细节，使操作对象变得简单

#* 9.5.1 私有变量，只有类的内部才可以访问的东西， 在变量前加双下划线(__)。  用self去访问他
#* 9.5.2 私有方法， @classmethod装饰，再写方法
#* 9.5.3 使用属性  1、公有的set、get方法， 可以在外部访问和修改私有属性方法 2、@property 代表取属性的方法  @name.setter 改属性, 获取和修改就可以和实例属性一样操作
#todo 

class Dog:
    public_name = 'DOG'
    __self_name = '品种'
    def __init__(self,name,color,age=1):
        self.name = name 
        self.color = color 
        self.__age = age
        self.__id = 1
    @classmethod
    def class_Method(cls):
        print(cls.public_name + cls.__self_name)
    def run(self):
        print('{0}-{1}-{2}在跑...'.format(self.name,self.color, self.__id))
    #? get 方法
    def get_id(self):
        return self.__id
    #? set 方法
    def set_id(self,id):
        self.__id = id
    #? 私有属性取值
    @property
    def age(self):
        return self.__age
    @age.setter
    def age(self,age):
        self.__age = age
        


dog = Dog('糯米', '白色')
dog.set_id(3)
dog.run() #? 糯米-白色-1在跑...

#? 使用私有属性装饰器和改变属性装饰器
print(dog.age) #? 1
dog.age = 5  
print(dog.age)  #? 5



