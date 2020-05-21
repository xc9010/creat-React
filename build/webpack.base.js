var path = require('path');

// __dirname表示当前目录，path.resolve()可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
module.exports = {
    /**
     * 项目入口文件
    */
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        // 指定要解析的文件扩展名
        extensions: [".web.js", ".jsx", ".js", ".json"],

        // 模块路径别名
        alias: {}
    },
    module: {
        /**
         * 各种类型模块的处理规则
         * 特别说明：
         * 1. use属性表示模块使用什么loader
         * 2. 模块可以使用多个loader，处理顺序为use属性的数组的第一个到最后一个
        */
        rules: [
            // 图片文件小于8192byte时，转换为base64字符串
            {
                test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
                exclude: /node_modules/,
                use: ["url-loader?limit=8192"]
            },
        
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            
            /**
             * 处理css模块 
             * loader说明：
             * 1. style-loader 将css文件以
             *      <link rel="stylesheet" href="path/to/file.css">
             *      的形式插入到html文件
             * 2. css-loader 处理css的 @import语句 与 url() ，同时压缩代码
             * 3. postcss-loader 对css做一些加工处理，具体的配置放在postcss.config.js，比如给              *    css自动添加浏览器厂商前缀。如果不知道css浏览器厂商前缀的，请自行百度。
            */
            {
                test: /\.(css)?$/,
                use: [
                    "style-loader/url",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: {
                                safe: true,
                                discardComments: {
                                    removeAll: true
                                }
                            }
                        }
                    },
                    "postcss-loader"
                ]
            },
            
            /**
             * 处理less模块
             * 特别说明：
             * 1. Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，                 *      使 CSS 更易维护和扩展。
             * 2. Less中文网：http://lesscss.cn/
            */
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            
            /**
             * 处理scss模块
             * 特别说明：
             * 1. sass与less类似，也是一门css预处理语言。
            */
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
}