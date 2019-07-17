const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ClearWebpackPlugin = require("clean-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

const config = require("../config");
const util = require("./util");
const ROOT_PATH = path.resolve(__dirname,"../");
const APP_PATH = path.resolve(ROOT_PATH, "src");


module.exports = {
    entry: {
        app: [APP_PATH + "/main.tsx"]
    },
    output: {
        path: config.buildPath,
        filename: util.assetsPath("js/[name].[chunkHash:7].js"),
        chunkFilename: util.assetsPath("js/[id].[chunkHash:7].js"),
        publicPath: config.publicPath
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(css|less)?$/,
                include: [APP_PATH],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: config.isDev
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: config.isDev,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: config.isDev,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                include: [APP_PATH],
                use: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.js$/,
                include: [APP_PATH],
                use: ["babel-loader"]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: [APP_PATH],
                use: ["url-loader?limit=1000"]
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                include: [APP_PATH],
                use: [
                    `url-loader?limit=1000&name=${util.assetsPath(
                        "img/[name].[hash:7].[ext]"
                    )}`
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test.title",
            template: APP_PATH + "/tpl.html",
            // chunks: ["app", "lib~app", "manifest", "vendors~app"],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: util.assetsPath("css/[name].[chunkHash:7].css"),
            chunkFilename: util.assetsPath("css/[id].[chunkHash:7].css")
        }),
        new webpack.ProgressPlugin()
    ].concat(
        config.isDev
            ? []
            : [
                  new OptimizeCssAssetsPlugin({
                      assetNameRegExp: /\.(css|less)$/g,
                      canPrint: true
                  }),
                  new ClearWebpackPlugin()
              ]
    ),
    devServer: {
        hot: true,
        inline: true,
        ...config.devserver
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                // chunkFilter: (chunk) => {
                //     // Exclude uglification for the `vendor` chunk
                //     if (chunk.name && chunk.name.indexOf("npm")!==-1) {
                //         console.log(chunk.name)
                //       return false;
                //     }

                //     return true;
                //   }
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
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: module => {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    },
    devtool: config.devtool,
    stats: {
        colors: true
    },
    performance: {
        hints: false
    },
    cache: config.isDev
};
