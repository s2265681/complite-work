<h1 align="">学习react-hooks和TypeScript打造的仿Antd的reactUI组件库</h1>

## ✨ RockUI

 学习React Hooks和TypeScript打造的仿Antd的react UI组件库，并通过此组件库在create-react-app的基础上实现了一套简单的应用，下方链接

- 样式解决方案——saas
- 测试——Jest框架
- Icon库基于react-fontawesome  [github](https://github.com/FortAwesome/react-fontawesome/)    [文档](https://fontawesome.com/)
- 文档使用Storybook进行展示
- 使用eslint和prettier对代码风格进行约束
- 使用见README.md,学习及开发中的坑与解决见STUDY_README.md



## 🔗 Links


- [Home page](https://s2265681.github.io/)

- [npm仓库](https://www.npmjs.com/package/rockui)

- [组件使用文档](https://s2265681.github.io/rockui/storybook-static/?path=/story/*)

- [github仓库——欢迎学习，start，merge](https://github.com/s2265681/rockui)

- [rockui-pro——基于rockui的项目](https://s2265681.github.io/rockui-pro/build/#/)
- [rockui-pro——github](https://github.com/s2265681/rockui-pro)

- [Icon Doc](https://fontawesome.com/icons?d=gallery&c=vehicles)



### ❤️功能

- [x] Alert组件
- [x] Animation 动画组件
- [x] Bg首页背景组件
- [x] Button组件
- [x] Commissio日程代办组件
- [x] Icon图标库
- [x] Input组件
- [x] Menu菜单
- [x] Spider轮播图组件
- [x] Spin加载中
- [x] Table表格
- [x] Tab选项卡



## ⌨️ 部分功能展示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619150721941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619150804184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)






## 📦 Install


```bash
npm install rockui
yarn add rockui
```



## 🔨 Usage


```jsx
import { Button, Icon } from "rockui";


const App = () => (
  <>
    <Button
      size={ButtonSize.Small}
      autoFocus
      onClick={e => {
        e.preventDefault();
      }}
      className="btn"
    >
      hello
    </Button>
    <Icon icon="coffee" theme="warning" size="2x" />
  </>
);
```


And import style manually:


```jsx
import "rockui/dist/rockui.css";
```



## ⌨️ Development


Use Gitpod, a free online dev environment for GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)


Or clone locally:


```bash
$ git clone https://github.com/s2265681/code/tree/master/React_Hook_UI/rockui
$ cd rockui
$ npm install
$ npm start
$ 修改注释 src/index.tsx 打包组件发布 >>> 页面展示
```



## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

欢迎一起学习，提issue，一起merge新功能。