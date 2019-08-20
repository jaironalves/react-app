import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import InterpolateHtmlPlugin from 'interpolate-html-plugin'
import Merge from 'webpack-merge'
import paths from './paths'

const HtmlWebpackPluginAdditionalOptions = mode =>
  mode !== 'development'
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    : undefined

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
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: paths.templatePath,
          },
          HtmlWebpackPluginAdditionalOptions(options.mode)
        )
      ),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: '',
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files) => {
          const manifestFiles = files.reduce(function(manifest, file) {
            manifest[file.name] = file.path
            return manifest
          }, seed)

          return {
            files: manifestFiles,
          }
        },
      }),
    ],
  })
