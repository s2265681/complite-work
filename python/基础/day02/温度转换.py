"""
将华氏温度转换为摄氏温度

Version: 0.1
Author: rockshang
"""

f = float(input('请输入华氏温度: '))
c = (f - 32) / 1.8

print('%.1f华氏度 = %.1f摄氏度' % (f, c))
# 等同于下面表达 输出时候格式化 成浮点类型 0.1 位小数
print(f'{f:.1f}华氏度 = {c:.1f}摄氏度')