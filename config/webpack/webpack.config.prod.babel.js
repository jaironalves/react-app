import Merge from 'webpack-merge'
import Common from './webpack.common.js'
import paths from './paths'

// Plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const namePattern = '[name]-[hash:8]'

const optionsCommon = {
  mode: 'production',
  namePattern,
  cssStyleLoader: MiniCssExtractPlugin.loader,
  fileLoader: {
    loader: 'file-loader',
    options: {
      name: namePattern + '.[ext]',
      outputPath: 'assets',
    },
  },
}

export default Merge(Common(optionsCommon), {
  devtool: 'source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: namePattern + '.css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([{ from: 'src/files', to: 'assets' }]),
  ],
})
