const merge = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // 设置分离的包最小为多少的时候分离出公共资源出来
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all', // 有三种可选参数，async表示分离异步的资源，initial表示分离同步的资源，all表示不区分
          minChunks: 2, // 设置最小引用次数为多少次的时候则分离出公共资源
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
