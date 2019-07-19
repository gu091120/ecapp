const path = require("path")

const config = {
    dev: {
        isDev:true,
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        devserverPort:8080,
        devserverProcess: {},
        devserverProxy: {},
        autoOpenBrower:false,
        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: "cheap-module-eval-source-map"
    },
    build: {
        isDev:false,
        buildPath: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: false

        //bundleAnalyzerReport: process.env.npm_config_report
    }
};

module.exports =
    process.env.NODE_ENV === "production" ? config.build : config.dev;
