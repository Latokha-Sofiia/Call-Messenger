import webpack from "webpack"
import "webpack-dev-server"
import { buildDevServer } from "./buildDevServer"
import { buildLoader } from "./buildLoaders"
import { buildPlugins } from "./buildPlugins"
import { buildResolvers } from "./buildResolver"
import { BuildOptions } from "./types/types"

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options
  const isDev = mode === "development"

  return {
    mode: mode ?? "production",
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.output,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoader(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && "inline-source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
