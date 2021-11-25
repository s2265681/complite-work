import babel from "rollup-plugin-babel";

let isDev = process.env.NODE_ENV === "develop";

let babelConfig = {
  presets: [
    [
      "env",
      {
        modules: false,
        targets: {
          browsers: ["chrome > 40", "safari >=7"],
        },
      },
    ],
  ],
};
export default {
  input: "index.js",
  watch: {
    exclude: "node_moudles/**",
  },
  output: {
    file: isDev
      ? "../website/client/js/eagie-montior/bundle.umd.js"
      : "./dist/bundle.umd.js",
    name: "EagleMonitor",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    babel({
      babelrc: false,
      presets: babelConfig.presets,
      plugins: babel.plugins,
      exclude: "node_moudles/**", // only transform our source code
    }),
  ],
};
