# coding=utf-8

#* 13.2 安装wxPython
#? pip是Python提供的包(库)管理工具
#? pip install wxPython
#? pip install wxPython -i https://pypi.tuna.tsinghua.edu.cn/simple   pip指定国内镜像

#! 升级python从2到3 https://www.cnblogs.com/cynthia-wuqian/p/9303514.html , https://blog.csdn.net/LQMIKU/article/details/107304477

#! MAC安装 WxPython 方法 https://www.jianshu.com/p/111b4bcc6148/

#* 13.3 第一个wxPython程序

# from wx.core import *
# from wx.core import wx
import wx
print(wx)

#? 创建应用程序对象
app = wx.App()

#? 创建窗口对象 prams(父窗口，标题,大小,位置)
frm = wx.Frame(None,title="第一个wxPython程序!",size=(400,300),pos=(100,100))

#? 显示窗口  窗口默认隐藏 需要调用Show方法
frm.Show()

#? 让应用程序进入主事件循环
app.MainLoop()