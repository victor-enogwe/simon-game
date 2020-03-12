import BrowserSync from 'browser-sync-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpack from 'html-webpack-plugin'
import HtmlWebpackTags from 'html-webpack-tags-plugin'
import MiniCssExtract from 'mini-css-extract-plugin'
import { resolve } from 'path'
import { Configuration, Loader } from 'webpack'
import { bsConfigApp } from './browsersync.config'

const scssConfig: Loader[] = [
  { loader: MiniCssExtract.loader },
  { loader: 'css-loader' },
  { loader: 'sass-loader', options: { sassOptions: { outputStyle: 'nested' }, sourceMap: true } }
]

const htmlConfig: HtmlWebpack.Options = {
  title: 'Simon Game',
  templateContent: '<body><simon-game></simon-game></body>',
  hash: false,
  filename: 'index.html',
  meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=yes' }
}

const fonts = ['//fonts.googleapis.com/css?family=Montserrat:300,400,600,700&amp;lang=en']

const HtmlWebpackPlugin = new HtmlWebpack(htmlConfig)

const HtmlWebpackTagsPlugin = new HtmlWebpackTags({ links: fonts })

const BrowserSyncPlugin = new BrowserSync(bsConfigApp)

const ExtractScssPlugin = new MiniCssExtract({ filename: '[name].css', chunkFilename: '[id].css' })

const jsConfig: Configuration = {
  mode: 'development',
  devtool: '#@source-map',
  context: resolve(__dirname, 'src'),
  target: 'web',
  entry: {
    index: './index.tsx'
  },
  plugins: [new CleanWebpackPlugin(), ExtractScssPlugin, HtmlWebpackPlugin, HtmlWebpackTagsPlugin, BrowserSyncPlugin],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules|dist/ },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.scss$/, exclude: /node_modules|dist/, use: scssConfig }
    ]
  }
}

export default [jsConfig]
