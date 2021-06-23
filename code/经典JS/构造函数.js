


function Parent (name,age) {
    var _name = '假';  // 私有属性
    var _getName = function(){
        console.log(_name,'这是假名字');  // 私有方法
    }
    
    this.name = name;    // 实例属性
    this.getAge = function(){  // 实例方法
        // return age
        console.log(age,'age')
    }

    Parent.xixi = 'xixi'  // 静态属性
    Parent.getXixi = function(){   // 静态方法
        console.log(Parent.xixi)
    }

    Parent.prototype.file = function(){   // 实例方法
        console.log('这是打印文件名方法')
    }
};

const p = new Parent('小明',40);

// p._name  err
// p._getName  err

// this.name  // 小明  40
// Parent.xixi  // xixi

// p.file