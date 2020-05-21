var base = require("./webpack.base.js"),
    // merge() 合并配置选项
    merge = require('webpack-merge'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    path = require('path'),
    copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
    // 开发模式
    mode: "development",
    
    devtool: "#cheap-module-eval-source-map",
    
    // webpack plugin -> https://webpack.docschina.org/plugins/
    plugins: [
        // 自动在输出位置创建html文件，并在html文件自动注入加载bundle的script标签或link标签
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            chunks: ["main", "vendor"],
            inject: true,
            chunksSortMode: "auto"
        })
    ],
    devServer: {
        host: '0.0.0.0',
        // contentBase: [path.join(__dirname, './')],
        port: 8033,
    }
});