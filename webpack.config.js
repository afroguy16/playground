const path = require('path')

const mode = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = {
    mode,

    entry: './src/index.ts',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader' }]
            },
            {
                test: /\.scss$/,
                type: 'asset/source',
                loader: 'sass-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        }
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devtool: "source-map"
}