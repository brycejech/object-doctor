'use strict';

const path = require('path');

module.exports = {
    entry: './src/object-doctor.js',
    output: {
        path:      path.resolve('./dist'),
        filename: 'object-doctor.min.js',
        library:  'objectDoctor',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6784
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
		]
    },
    devtool: 'source-map'
}
