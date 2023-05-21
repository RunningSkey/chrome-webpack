//https://www.webpackjs.com/plugins/split-chunks-plugin#optimizationsplitchunks
// const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  externals: {
    chrome: "chrome",
  },
  mode: "production",
  // devtool: "source-map",
  entry: {
    background: path.resolve(__dirname, "src/background/index.ts"),
    content: path.resolve(__dirname, "src/content-scripts/index.ts"),
    popup: path.resolve(__dirname, "src/popup/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // use: [
        // 'style-loader',
        // 'css-loader'
        // ]
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    // minimize: process.env.NODE_ENV === "pro" ? true : false,
    splitChunks: {
      chunks: "all", //共3中 initial 初始化需要的，async 按需加载的，all 全部模块
      minChunks: 1, //拆分前必须共享模块的最小 chunks 数。
      minSize: 30000, //超过30k 才被分割
      maxAsyncRequests: 5, //按需加载时的最大并行请求数。 默认30
      maxInitialRequests: 3, //入口点的最大并行请求数。默认30
      automaticNameDelimiter: "~", //名称的分隔符 例如 vendors~main.js
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/, //拆分node_module
          priority: 10,
          chunks: "initial", // only package third parties that are initially dependent
        },
        //默认值 不用填
        // default: {
        //   //模块缓存规则 设置为false 不使用缓存
        //   miniChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true, //默认使用已有的模块
        // },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/popup/popup.html"),
      filename: path.resolve(__dirname, "dist/popup.html"),
      inject: "body",
      scriptLoading: "blocking",
      chunks: ["popup"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // 将 public 目录下的文件复制到 dist 目录下
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "", // 可以根据需要指定要复制到的路径，例如 'assets'，如果留空则复制到 dist 根目录下
        },
      ],
    }),
  ],
};
