import Merge from 'webpack-merge'
import Common from './webpack.common.js'
import Path from 'path'

// Plugins
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const optionsCommon = ({
    mode: 'production',
    cssStyleLoader: MiniCssExtractPlugin.loader,
    fileLoader: {
        loader: 'file-loader',
        options: {
            name: '[path][name]-[hash:8].[ext]'
        }
    }
})

export default Merge(Common(optionsCommon), {
    output: {
        filename: '[name].bundle.js',
        path: Path.resolve(__dirname, '../dist'),
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { root: Path.resolve(__dirname, '..') }),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin()
    ]
})