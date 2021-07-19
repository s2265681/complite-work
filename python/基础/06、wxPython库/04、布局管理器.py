
# coding=utf-8
# python -u ~/Desktop/complite-work/python/基础/06、wxPython库/04、布局管理器.py

#* 布局管理器 常用盒子布局管理器 wx.BoxSizer(wx.HORIZONTAL)

#todo 对齐标志
#todo  flag  标志
#todo  wx_ALIGN_TOP  顶对齐
#todo  wx_ALIGN_BOTTOM 底对齐  | wx_ALIGN_LEFT | wx_ALIGN_RIGHT
#todo  wx_ALIGN_CENTER 居中对齐 wx_ALIGN_CENTER_VERTICAL | wx_ALIGN_CENTER_HORIZONTAL


#todo flag边框标志
#todo wx.TOP  |  wx.RIGHT |  wx.ALL |  wx.BOTTOM ...


#todo flag调整尺寸标志
#todo wx.EXPAND  完全填充
#todo wx.SHAPED  调整子窗口 保存宽高宽比 
#todo wx.FIXED_MINSIZE  调整子窗口为最小尺寸

#? 重构事件处理实例
# import sys
# from sys import flags
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
        #* 创建垂直方向的盒子布局管理器对象vbox
        vbox = wx.BoxSizer(wx.VERTICAL)
        #* 添加静态文本到vbox布局管理区 proportion为权重 flag(控件位置，包裹的控件方式，边框方向)
        vbox.Add(self.statictext,proportion=1,
                 flag=wx.ALIGN_CENTER_HORIZONTAL|wx.FIXED_MINSIZE|wx.TOP,border=30)
        #* 添加按钮b到vbox布局管理器
        vbox.Add(b,proportion=1,flag=wx.EXPAND|wx.BOTTOM,border=10)
        #* 设置面板(panel) 采用vbox布局管理器
        panel.SetSizer(vbox)

    def on_click(self,event):
        self.statictext.SetLabelText("Hello World")
       
        
app = wx.App()  # ? 创建应用程序
frm = MyFrame()  # ? 创建窗口对象 prams(父窗口，标题,大小,位置)
frm.Show()  # ? 显示窗口  窗口默认隐藏 需要调用Show方法
app.MainLoop()  # ? 让应用程序进入主事件循环
