# coding=utf-8

# 推荐缩紧4个半

# if 



# if-else



# if score >= 60:
#      if score >= 85:
#          print("您真优秀")
#      else:
#          print("您很好") 
# else:
#     print("您需要努力")

# if-elif-else  替代多分支条件
score = int(input("请输入0-100的整数:"))
if score >= 90:
     grade = "A"
elif score>=80:
     grade = "B"
elif score>=70:
     grade = "C"
elif score>=60:
     grade = "D"
else: 
     grade = "E"
print(grade)

