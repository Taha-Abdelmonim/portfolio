// webpack.common.js: shared Webpack configuration for development and production mode.
const path = require("path"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  webpack = require("webpack"),
  autoprefixer = require("autoprefixer"),
  miniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
  entry: {
    index: path.resolve(__dirname, "../", "src/js/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    filename: "[name].js",
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        // miniCssExtractPlugin.loader,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|ico|webp|woff(2)?|ttf|otf|eot|svg)$/,
        type: "asset/resource",
        use: [
          {
            loader: "webp-loader",
            options: {
              quality: 13,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      filename: "index.html",
      template: "./src/html/index.pug",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "../dist")],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    // noErrorOnMissing: true,
    new CopyPlugin({
      patterns: [
        { from: "src/robots.txt", to: "robots.txt" },
        { from: "src/sitemap.xml", to: "sitemap.xml" },
        { from: "src/html/google766e914e8e3c9562.html", to: "google766e914e8e3c9562.html" },
        { from: "src/html/404.html", to: "404.html" },
        // {
        //   from: "src/html/.htaccess",
        //   to: ".htaccess",
        //   globOptions: {
        //     dot: true,
        //     noErrorOnMissing: true,
        //     ignore: ["**/.gitkeep"],
        //   },
        // },
      ],
    }),

    new miniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin(),
  ],
};
