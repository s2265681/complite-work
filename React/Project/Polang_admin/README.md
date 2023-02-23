

# 生成项目结构 
> pnpm create vite my-vue-app --template vue

# 配置路由

```js
  import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
  import { Suspense, lazy } from "react"; // 与lazy 配合使用 在懒加载中 维护loading回调
  <Router>
    <div id="slider">
      <h1>Hello world</h1>
      <Link to={`/one`}>one</Link> |<Link to={`/two`}>two</Link> |
      <Link to={`/three`}>three</Link>
    </div>
    <Suspense>
      <Routes>
        <Route path="/one" element={<One />} />
        <Route path="/two" element={<Two />} />
        <Route path="/three" element={<Three />} />
      </Routes>
    </Suspense>
  </Router>
```

# 配置redux 
![redux hooks](https://react-redux.js.org/tutorials/typescript-quick-start)

 1. 创建slice 
 2. export actions
 3. export store
 4. useSelector、 useDispatch


# 配置国际化 

安装 i18next react-i18next

```js
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});
```
> 更改 全局 语言  i18n.changeLanguage(e.target.value);
> 注意需要全局组件更新， 需要强制刷新，顶层祖先页面