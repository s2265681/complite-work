

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


# 