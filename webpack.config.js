const path = require('path')

const mode = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = {
    mode,

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {loader: 'css-loader'}]
            },
            {
                test: /\.scss$/,
                use: [
                    'raw-loader',
                  {
                    loader: 'sass-loader',
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
          }
    },

    devtool: "source-map"
}