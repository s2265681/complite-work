/** @type {import('tailwindcss').Config} */
module.exports = {
  // 这里给出了一份 taro 通用示例，具体要根据你自己项目的目录结构进行配置
  // 比如你使用 vue3 项目，你就需要把 vue 这个格式也包括进来
  // 不在 content glob表达式中包括的文件，在里面编写tailwindcss class，是不会生成对应的css工具类的
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  // 其他配置项 ...
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#56a1ed",
        success: "#5bb279",
        warning: "#5bb279",
        error: "#e15d33",
        base: {
          DEFAULT: "#222222",
          bbb: "#BBBBBB",
          999: "#999999",
          666: "#666666",
          222: "#222222",
        },
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};
