import { merge } from "webpack-merge";
import common from "./webpack.config.common.mjs";

export default merge(common, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});