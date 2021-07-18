# coding=utf-8

# * 9.7 多态性

# ? 多态，指对象可以表现出多种形态， "一龙生九子，九子各不同"


# * 9.7.1 继承与多态
# ? 多态发生在继承情况下， 不同类下会有不同属性方法

# todo : 猫狗都继承父类动物的叫方法，但是各自叫的方式不同
class Animal(object):
    def speak(self):
        print('动物叫，但是不知道哪种动物叫！')


class Dog(Animal):
    def speak(self):
        print('小狗，汪汪...')


class Cat(Animal):
    def speak(self):
        print('小猫，喵喵...')


dog = Dog()
# dog.speak() #? 小狗，汪汪...
cat = Cat()
# cat.speak() #? 小猫，喵喵...

# * 9.7.2 鸭子类型测试， 也是实现多态的一种手段， 关键点是多个类拥有同一个相同的方法可以调用
# todo  写一个start函数， 将不同类实例传入， 会对不同的类执行相同的方法

def start(object):
    object.speak()

class Animal(object):
    def speak(self):
        print('动物叫，但是不知道哪种动物叫！')


class Dog(Animal):
    def speak(self):
        print('小狗，汪汪...')


class Cat(Animal):
    def speak(self):
        print('小猫，喵喵...')


class Car(Animal):
    def speak(self):
        print('小汽车，滴滴...')

start(Dog()) #? 小狗，汪汪...
start(Cat()) #? 小猫，喵喵...
start(Car()) #? 小汽车，滴滴...