import MiniCssExtractPlugin, { Configuration } from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { BuildOptions } from "./types/types"
import webpack, { DefinePlugin } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import path from "path"
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const isDev = options.mode === "development"
  const isProd = options.mode === "production"

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, "icons", "frame.svg"),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform),
      __ENV__: JSON.stringify(options.mode),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(options.paths.public, 'icons'), to: path.resolve(options.paths.output, 'icons') },
        { from: path.resolve(options.paths.public, 'images'), to: path.resolve(options.paths.output, 'images') },
      ],
    }),
  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    )
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
