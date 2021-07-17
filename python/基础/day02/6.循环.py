# coding=utf-8

# while循环 else    break 、 return
i =0
while i*i< 1000:
    i += 1
    if i == 10:
        break
else:
    print('while over!')

print("i="+ str(i))

# for语句  break 跳出循环
# for 变量 in 可迭代对象:
    # 循环体语句
# 【else: 
    # 语句组]

arr = ['张三','李四']
for i in arr:
    # if(i=='李四'):
    #     break
    print(i)
else: 
    print("没有中断，执行For Over!")
        
