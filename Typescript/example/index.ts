// 定义一个装饰器
function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log(target, methodName, descriptor, "ss");
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method ${methodName} called with arguments: ${args}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${methodName} returned: ${result}`);
    this.name = "22222";
    return result;
  };

  return descriptor;
}

class Calculator {
  name: string;
  constructor() {
    this.name = "1";
  }
  @log
  add(x: number, y: number) {
    return x + y;
  }
}

const calculator = new Calculator();
console.log(calculator.add(2, 3));
console.log(calculator, "calculatorcalculator");

// 1、 tsconfig 要在node的路径上，不然会报错
// 2、 ts-node 执行 要在这个目录下 /Users/shangjiawei/MyGithub/complite-work/Typescript/example'
