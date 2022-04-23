// webpack.dev.js: Webpack configuration only used by development mode.
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "../", "dist"),
      watch: true,
    },
    watchFiles: "src/**/*.*",
    liveReload: true,
    hot: false,
    port: 9000,
    open: true,
    client: {
      logging: "error",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
