import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Merge from 'webpack-merge'
import paths from './paths'

export default options =>
  Merge({
    mode: options.mode,
    entry: paths.entryPath,
    output: {
      filename: `${paths.jsFolder}/${options.namePattern}.js`,
      path: paths.outputPath,
      chunkFilename: `${paths.jsFolder}/${options.namePattern}.[chunkhash].js`,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [options.styleLoaderInitial, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            options.styleLoaderInitial,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(pdf|jpg|png|gif|svg|ico)$/,
          use: [options.fileLoader],
        },
      ],
    },
    plugins: [
      new Webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: paths.templatePath,
        minify: {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          minifyURLs: true,
          removeComments: true,
          removeAttributeQuotes: true,
        },
      }),
    ],
  })
