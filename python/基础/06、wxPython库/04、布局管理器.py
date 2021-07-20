
# coding=utf-8
# python -u ~/Desktop/complite-work/python/基础/06、wxPython库/04、布局管理器.py

# * 布局管理器 常用盒子布局管理器 wx.BoxSizer(wx.HORIZONTAL)

# todo 对齐标志
# todo  flag  标志
# todo  wx_ALIGN_TOP  顶对齐
# todo  wx_ALIGN_BOTTOM 底对齐  | wx_ALIGN_LEFT | wx_ALIGN_RIGHT
# todo  wx_ALIGN_CENTER 居中对齐 wx_ALIGN_CENTER_VERTICAL | wx_ALIGN_CENTER_HORIZONTAL


# todo flag边框标志
# todo wx.TOP  |  wx.RIGHT |  wx.ALL |  wx.BOTTOM ...


# todo flag调整尺寸标志
# todo wx.EXPAND  完全填充
# todo wx.SHAPED  调整子窗口 保存宽高宽比
# todo wx.FIXED_MINSIZE  调整子窗口为最小尺寸

# ? 重构事件处理实例
# import sys
# from sys import flags
import wx


class MyFrame(wx.Frame):
    def __init__(self):
        super(MyFrame, self).__init__(
            None, title="第一个wxPython程序!", size=(300, 180), pos=(100, 100))
        panel = wx.Panel(parent=self)

        # * 生成文本、按钮
        self.statictext = wx.StaticText(parent=panel, label="单击OK按钮")
        b1 = wx.Button(parent=panel, label="按钮1", id=1)
        b2 = wx.Button(parent=panel, label="按钮2", id=2)


        self.Bind(wx.EVT_BUTTON, self.on_click1, b1)
        self.Bind(wx.EVT_BUTTON, self.on_click2, b2)

        # * 创建水品方向的盒子布局管理器对象
        hbox = wx.BoxSizer(wx.HORIZONTAL)

        # * 添加按钮b到hboxBottom布局管理器
        hbox.Add(b1, proportion=1, flag=wx.EXPAND | wx.ALL, border=10)
        hbox.Add(b2, proportion=1, flag= wx.EXPAND | wx.ALL, border=10)

        # * 创建垂直方向的大盒子布局管理器对象
        vbox = wx.BoxSizer(wx.VERTICAL)

        # * 添加静态文本到vbox
        vbox.Add(self.statictext, proportion=1,flag=wx.CENTER | wx.FIXED_MINSIZE | wx.TOP, border=10)
         
        #* 添加水平布局
        vbox.Add(hbox, proportion=1,flag=wx.CENTER, border=10)

        # * 设置面板(panel) 采用vbox布局管理器
        panel.SetSizer(vbox)

    def on_click1(self, event):
        event_id = event.GetId()
        print("按钮:{}".format(event_id))
    def on_click2(self, event):
        event_id = event.GetId()
        print("按钮:{}".format(event_id))


app = wx.App()  # ? 创建应用程序
frm = MyFrame()  # ? 创建窗口对象 prams(父窗口，标题,大小,位置)
frm.Show()  # ? 显示窗口  窗口默认隐藏 需要调用Show方法
app.MainLoop()  # ? 让应用程序进入主事件循环
