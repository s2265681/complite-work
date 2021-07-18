# coding=utf-8

# * 9.6.1 python 中的继承就是在括号内写上父类的名字，  并在初始化的时候调用super方法调用父类初始化的方法将属性传入

class Animal(object):
    def __init__(self, name):
        self.name = name

    def show_info(self):
        return "动物的名字:{0}".format(self.name)

    def move(self):
        print("动一动...")


class Cat(Animal):
    def __init__(self, name, age):
        #! python2 的super需要子类和self传入， python3 不用
        super(Cat, self).__init__(name)  # todo 调用super方法调用父类初始化的方法将属性传入
        self.age = age  # ? 实例变量age


cat = Cat("Tom", 2)
print(cat.show_info()) #? 动物的名字:Tom
cat.move() #? 动一动...
print(cat.age) #? 2
print(cat.name) #? Tom


# * 9.6.2 多继承  比如骡子继承马和驴， 如果发生冲突的继承方法， 有先后问题， 多个父类情况下， 优先继承前面类的
#! python2 继承父类需要写object
class Hourse(object):
    def __init__(self, name):
        self.name = name

    def show_info(self):
        print('马的名字{}'.format(self.name))

    def run(args):
        print('马跑...')


class Donkey(object):
    def __init__(self, name):
        self.name = name

    def show_info(self):
        print('驴的名字{}'.format(self.name))

    def run(args):
        print('驴跑...')

    def roll(args):
        print('驴打滚...')


class Mule(Hourse, Donkey):
    def __init__(self, name):
        super(Mule, self).__init__(name)
#* 9.6.3 方法重写  以上为例子  子类重写父类方法,  和父类方法相同即可重写， 其他语言也有的叫方法的覆盖...
    def show_info(self):
        print("骡子:{0}".format(self.name))
    

mule = Mule('驴多宝')
mule.show_info() #? 骡子:驴多宝
mule.run() #? 马跑...
mule.roll() #? 驴打滚...



