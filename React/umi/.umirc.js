export default {
  title: "Rock-Umi",
  alias: {
    api: "@/api/",
  },
  // 按需加载
  // dynamicImport: {
  //   loading: '@/Loading'
  // },
  // 启用服务端渲染
  ssr: {},
  // 结合启用服务端渲染 开启预渲染
  // 预渲染默认情况下不会渲染动态路由里的所有页面，如果需要渲染动态路由中的页面，通过配置 extraRoutePaths，例如：
  exportStatic: {
    // extraRoutePaths: async () => {
      // const result = await request('https://your-api/news/list');
      // return Promise.resolve(["/", "/index", "/profile", "/user", "/user/list"]);
    // },
  },
};
