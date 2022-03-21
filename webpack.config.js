const path = require('path')

const mode = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = {
    mode,

    module: {
        rules: [
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
    }
}