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
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.js$/,
          include: paths.srcPath,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
              },
            },
          ],
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              use: [
                {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: `assets/${options.namePattern}.[ext]`,
                  },
                },
              ],
            },
            {
              test: /\.js$/,
              include: paths.srcPath,
              exclude: /node_modules/,
              use: ['babel-loader'],
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
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: options.namePattern + '.[ext]',
                    outputPath: 'assets',
                  },
                },
              ],
            },
          ],
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
