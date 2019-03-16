import Merge from 'webpack-merge'
import Common from './webpack.common.js'
import Path from 'path'

// Plugins
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const namePattern = '[name]-[hash:8]';

const optionsCommon = {
  mode: 'production',
  cssStyleLoader: MiniCssExtractPlugin.loader,
  fileLoader: {
    loader: 'file-loader',
    options: {
      name: namePattern + '.[ext]',
      outputPath: 'assets',
    },
  },
}

const rootDir = Path.resolve(__dirname, '../..')
const distPath = 'dist/public'

export default Merge(Common(optionsCommon), {
  output: {
    filename: namePattern + '.js',
    path: Path.resolve(rootDir, distPath),
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin([distPath], { root: rootDir }),
    new MiniCssExtractPlugin({
      filename: namePattern + '.css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([{ from: 'src/files', to: 'assets' }]),
  ],
})
