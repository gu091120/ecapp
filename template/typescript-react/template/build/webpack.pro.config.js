const merge = require("webpack-merge")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const ClearWebpackPlugin = require("clean-webpack-plugin")
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const webpackBaseConfig = require("./webpack.base.config")


module.exports = merge(webpackBaseConfig, {
    mode: "production",
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.(css|less)$/g,
            canPrint: true
        }),
        new ClearWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        //warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量``
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true
                    },
                    dead_code: true
                }
            })
        ],
        runtimeChunk: {
            name: "single"
        },
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "all",
                    priority: 10,
                    enforce: true
                },
                libs: {
                    test: /(react|react-router|react-router-dom|react-redux|redux|react-dom)/,
                    chunks: "all",
                    priority: 20,
                    enforce: true
                },
                commons_component: {
                    chunks: "all",
                    test: /components|containers/,
                    minChunks: 2,
                    priority: 5,
                    enforce: true
                }
            }
        }
    }
})
