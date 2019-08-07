import Merge from 'webpack-merge'
import Common from './webpack.common.js.js'
import Path from 'path'

// Plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import TerserJSPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import paths from './paths'

const namePattern = '[name]-[hash:8]'

const optionsCommon = {
  mode: 'production',
  namePattern,
  styleLoaderInitial: MiniCssExtractPlugin.loader,
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
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: Path.join(paths.cssFolder, namePattern + '.css'),
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([{ from: 'src/files', to: 'assets' }]),
  ],
})
