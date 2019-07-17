module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        "eslint:recommended" //默认推荐配置
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
        //ecmaFeatures: { jsx: true, modules: true }
    },
    parser: "babel-eslint", //编译器选择
    rules: {
        //indent: ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        quotes: ["error", "double"],
        //semi: ["error", "always"],
        "no-console": "off",
        "no-mixed-spaces-and-tabs": "off"
        // "react/jsx-uses-react": "error",
        // "react/jsx-uses-vars": "error",
        // "react/display-name": 0
    }
}
/* eslint-disable no-alert, no-console */
//禁用或启用特定规则的警告
/* eslint-enable no-alert, no-console */
