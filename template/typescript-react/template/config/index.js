const path = require("path")

const config = {
    dev: {
        isDev:true,
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        devserver: {
            port: 8080,
            host: "0.0.0.0",
            open: true,
            proxy: {},
            // errorOverlay: true,
            // notifyOnErrors: true,
            watchOptions:{
                poll: false // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
            }
        },

        // Various Dev Server settings

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
        devtool: "#source-map",

        //bundleAnalyzerReport: process.env.npm_config_report
    }
};

module.exports =
    process.env.NODE_ENV === "production" ? config.build : config.dev;
