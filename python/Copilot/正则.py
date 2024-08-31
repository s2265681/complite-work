# 用 python 和正则表达式，从类似于 "jane@example.com,john@example.com, bob@example.com, mary@example.com" 的字符串中提取出有相同的列表
import re

string_to_parse = "jane@example.com,john@example.com, bob@example.com"
emails = re.findall(r'[\w\.-]+@[\w\.-]+', string_to_parse)
print(emails)

# 解释一下这个正则表达式：re.findall(r'[\w\.-]+@[\w\.-]+', string_to_parse)

# [\w\.-]+ 匹配一个或多个字母、数字、下划线、点或短横线
# @ 匹配一个 @ 符号
# [\w\.-]+ 匹配一个或多个字母、数字、下划线、点或短横线
# re.findall() 函数返回一个列表，其中包含与正则表达式匹配的所有字符串。
