# coding=utf-8

# * 14 模版
import wx

class MyFrame(wx.Frame):
    def __init__(self):
        super(MyFrame, self).__init__(
            None, title="第一个wxPython程序!", size=(400, 300), pos=(100, 100))
        panel = wx.Panel(parent=self)
        self.statictext = wx.StaticText(parent=panel, label="hello world", pos=(10, 10))
        #* 绑定事件
        b = wx.Button(parent=panel,label="OK",pos=(100,50))
        self.Bind(wx.EVT_BUTTON,self.on_click,b)

    def on_click(self,event):
        self.statictext.SetLabelText("Hello World")

        #* 布局管理器 常用盒子布局管理器 wx.BoxSizer(wx.HORIZONTAL)
        


app = wx.App()  # ? 创建应用程序
frm = MyFrame()  # ? 创建窗口对象 prams(父窗口，标题,大小,位置)
frm.Show()  # ? 显示窗口  窗口默认隐藏 需要调用Show方法
app.MainLoop()  # ? 让应用程序进入主事件循环


# [
# '/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages', 
# '/System/Library/Frameworks/Python.framework/Versions/2.7/lib/site-python', 
# '/Library/Python/2.7/site-packages'
# ]

# /usr/local/Cellar/wxpython/4.1.1_2
# /usr/local/Cellar/wxpython/4.1.1_2/lib/python3.9/site-packages

# ln -s /usr/local/Cellar/wxpython/4.1.1_2/lib/python3.9/site-packages/wx/lib wx