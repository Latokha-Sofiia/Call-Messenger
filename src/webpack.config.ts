import path from "path"
import webpack from "webpack"
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
  buildWebpack,
} from "./core/config/build-config"

interface EnvVariables {
  mode?: BuildMode
  analyzer?: boolean
  port?: number
  platform?: BuildPlatform
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "index.tsx"),
    html: path.resolve(__dirname, "assets", "index.html"),
    public: path.resolve(__dirname, "assets"),
    src: path.resolve(__dirname),
  }

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  })

  return config
}
