import Common from './webpack.common.js'
import Merge from 'webpack-merge'
import Webpack from 'webpack'
import Jarvis from 'webpack-jarvis'
import paths from './paths'

const optionsCommon = {
  mode: 'development',
  cssStyleLoader: 'style-loader',
  fileLoader: {
    loader: 'url-loader',
  },
}

export default Merge(Common(optionsCommon), {
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js',
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 20000000,
    maxEntrypointSize: 8500000,
    assetFilter: assetFilename => {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: paths.outputPath,
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Jarvis({
      port: 1337,
    }),
  ],
})
