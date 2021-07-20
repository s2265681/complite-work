# coding=utf-8
# python -u ~/Desktop/complite-work/python/基础/06、wxPython库/03、模版.py 
# * 14 模版 + 事件绑定
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

app = wx.App()   # ? 创建应用程序
frm = MyFrame()  # ? 创建窗口对象 prams(父窗口，标题,大小,位置)
frm.Show()       # ? 显示窗口  窗口默认隐藏 需要调用Show方法
app.MainLoop()   # ? 让应用程序进入主事件循环
