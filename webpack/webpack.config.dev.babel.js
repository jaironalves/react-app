import Common from './webpack.common.js'
import Merge from 'webpack-merge'
import Webpack from 'webpack'
import paths from './paths'

const optionsCommon = {
  mode: 'development',
  namePattern: '[name]',
  styleLoaderInitial: 'style-loader',
  fileLoader: {
    loader: 'url-loader',
  },
}

export default Merge(Common(optionsCommon), {
  devtool: 'inline-source-map',
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
  plugins: [new Webpack.HotModuleReplacementPlugin()],
})