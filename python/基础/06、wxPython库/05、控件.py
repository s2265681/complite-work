
# coding=utf-8
# python -u ~/Desktop/complite-work/python/基础/06、wxPython库/05、控件.py

#todo 控件
#todo 文本输入控件
#todo 单选多选
#todo 列表
#todo 静态图片控件

import wx

class MyFrame(wx.Frame):
    def __init__(self):
        super(MyFrame, self).__init__(
            None, title="第一个wxPython程序!", size=(500, 1000), pos=(500, 20))
        panel = self.panel = wx.Panel(parent=self)

        # * 生成文本
        userid = wx.StaticText(parent=panel, label="用户id:")
        pwd = wx.StaticText(parent=panel, label="密码:")
        content = wx.StaticText(parent=panel, label="多行文本:")
        favorite = wx.StaticText(parent=panel, label="选择你喜欢的编程语言:")
        sex = wx.StaticText(parent=panel, label="选择性别:")
        listText = wx.StaticText(parent=panel, label="选择列表:")

        #* 生成输入框
        tc1 = wx.TextCtrl(panel)
        tc2 = wx.TextCtrl(panel, style=wx.TE_PASSWORD)
        tc3 = wx.TextCtrl(panel, style=wx.TE_MULTILINE)

        cb1 = wx.CheckBox(panel,id=1, label='Python')
        cb1.SetValue(True)
        cb2 = wx.CheckBox(panel, id=2, label='JAVA')
        cb3 = wx.CheckBox(panel, id=3, label='C++')
        self.Bind(wx.EVT_CHECKBOX,self.on_checkbox_click,id=1,id2=3)

        radio1 = wx.RadioButton(panel,id=4,label="男",style=wx.RB_GROUP)
        radio2 = wx.RadioButton(panel,id=5,label="女")
        radio2.SetValue(True)
        self.Bind(wx.EVT_RADIOBUTTON,self.on_radio_click,id=4,id2=5)

        list1 = ['logo','腾讯']
        lb = wx.ListBox(panel,choices=list1,style=wx.LB_EXTENDED)  #! LB_SINGLE 单选 LB_EXTENDED 多选
        self.Bind(wx.EVT_LISTBOX,self.on_listbox_click, lb)

        #* 创建图片对象
        self.bmps = [
            wx.Bitmap('loading.gif',wx.BITMAP_TYPE_GIF),
            wx.Bitmap('tencent.png',wx.BITMAP_TYPE_PNG),
        ]
        self.image = wx.StaticBitmap(panel,bitmap=self.bmps[0])

        #* 创建水平方向
        hbox1 = wx.BoxSizer()
        hbox1.Add(favorite,flag=wx.LEFT|wx.RIGHT,border=5)
        hbox1.Add(cb1)
        hbox1.Add(cb2)
        hbox1.Add(cb3)

        hbox2 = wx.BoxSizer()
        hbox2.Add(sex,flag=wx.LEFT|wx.RIGHT,border=5)
        hbox2.Add(radio1)
        hbox2.Add(radio2)

        hbox3 = wx.BoxSizer()
        hbox3.Add(listText,flag=wx.LEFT|wx.RIGHT,border=5)
        hbox3.Add(lb)

        # * 创建垂直方向的大盒子布局管理器对象
        vbox = wx.BoxSizer(wx.VERTICAL)

        #* 依次添加控件
        vbox.Add(userid,flag=wx.EXPAND|wx.LEFT,border=10)
        vbox.Add(tc1,flag=wx.EXPAND|wx.ALL,border=10)
        vbox.Add(pwd,flag=wx.EXPAND|wx.LEFT,border=10)
        vbox.Add(tc2,flag=wx.EXPAND|wx.ALL,border=10)
        vbox.Add(content,flag=wx.EXPAND|wx.LEFT,border=10)
        vbox.Add(tc3,flag=wx.EXPAND|wx.ALL,border=10)
        vbox.Add(hbox1,flag=wx.EXPAND|wx.ALL,border=10)
        vbox.Add(hbox2,flag=wx.EXPAND|wx.ALL,border=10)
        vbox.Add(hbox3,flag=wx.EXPAND|wx.ALL,border=10)
        vbox.Add(self.image,flag=wx.EXPAND|wx.ALL,border=10)
        

        # * 设置面板(panel) 采用vbox布局管理器
        panel.SetSizer(vbox)

        tc1.SetValue('tony')

        print("tc1的值{}".format(tc1.GetValue()))
    
    def on_checkbox_click(self,event):
        rb = event.GetEventObject()
        print(rb.GetLabel(),event.IsChecked)

    def on_radio_click(self,event):
        rb = event.GetEventObject()
        choice_id = event.GetId()
        print(rb.GetLabel(),choice_id)
      
    
    def on_listbox_click(self,event):
        rb = event.GetEventObject()
        print(rb.GetSelections())
        choice_id = rb.GetSelections()[0]
        if choice_id == 0:
            self.image.SetBitmap(self.bmps[0])
        else:
            self.image.SetBitmap(self.bmps[1])
        self.panel.Layout()

app = wx.App()
frm = MyFrame()
frm.Show()
app.MainLoop()
