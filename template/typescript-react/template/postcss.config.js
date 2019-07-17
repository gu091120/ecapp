const config = require("./config");

module.exports = {
    ident: "postcss",
    sourceMap: config.isDev,
    plugins: [
        require("autoprefixer")({
            browsers: [
              {{#if_eq terminal  "H5"}}
              "iOS >= 8",
              "Android >= 4",
              {{/if_eq}}
              {{#if_eq terminal  "PC"}}
              "last 2 versions",
              "> 1%",
              "ie >= 9"
              {{/if_eq}}
            ]
        })
    ]
};
