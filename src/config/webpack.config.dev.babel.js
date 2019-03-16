import Common from './webpack.common.js'
import Merge from 'webpack-merge'
import Webpack from 'webpack'

const optionsCommon = {
  mode: 'development',
  cssStyleLoader: 'style-loader',
  fileLoader: {
    loader: 'url-loader',
  },
}

export default Merge(Common(optionsCommon), {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
})
