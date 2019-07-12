'use strict';
const path = require('path');

module.exports = {
    mode: 'production',
    devtool: '#source-map',
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: "[name].js"
    }
};