const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const config = require("../config")
const util = require("./util")
const ROOT_PATH = path.resolve(__dirname, "../")
const APP_PATH = path.resolve(ROOT_PATH, "src")

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
                use: ["babel-loader", "ts-loader?transpileOnly=true"]
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
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: util.assetsPath("css/[name].[chunkHash:7].css"),
            chunkFilename: util.assetsPath("css/[id].[chunkHash:7].css")
        }),
        new ForkTsCheckerWebpackPlugin({
          tsconfig:path.resolve(__dirname,"../tsconfig.json"),
          reportFiles:[APP_PATH]
        }),
        //new webpack.ProgressPlugin()
    ],
    devtool: config.devtool,
    stats: {
        colors: true
    },
    performance: {
        hints: false
    },
    cache: config.isDev
}

