const webpackMerge = require('webpack-merge');
const commonPartial = require('./webpack/webpack.common');
const prodPartial = require('./webpack/webpack.prod');
const devPartial = require('./webpack/webpack.dev');

const isProd = process.env.NODE_ENV === 'production';

console.log(`Running ${isProd ? 'production' : 'development'} build.`); //eslint-disable-line

module.exports = webpackMerge({}, commonPartial, isProd ? prodPartial : devPartial);
