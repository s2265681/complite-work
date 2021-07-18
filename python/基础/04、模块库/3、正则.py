# coding=utf-8

import re

#* 11.3.1 字符串匹配  re.match(p,text)  p 是正则 

p = r'\w+@163.com'
email = 's2222@163.com'
m = re.match(p,email) #? <_sre.SRE_Match object at 0x10c51bcc8>
print(m) 

#* 11.3.2 字符串查找  re.serch(p,text) |  re.findall(p,text) 前者只找一个，后者找到多个

p1 = r'JAVA|java|JAVA'
t1 = 'I like Java and java and JAVA'
m1 = re.search(p1,t1) 
print(m1) #? <_sre.SRE_Match object at 0x10febdd98>
m2 = re.findall(p1,t1)
print(m2) #? ['java', 'JAVA']

#* 字符串替换 re.sub(pattern,repl,string,count=0)  分别是正则，新字符串，旧字符串，最大数量 默认为0 表示不限制

p2 = r'\d+'
t2 = 'ABCD212121244EFS'
repace_text = re.sub(p2,'', t2)
print(repace_text) #? ABCDEFS
print(re.sub(r'我','你','我是中国人')) #? 你是中国人

#* 字符串分割 re.split(pattern,string,maxsplit=0)  根字符串的split方法一样