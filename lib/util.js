const path = require("path")
const inquirer = require("inquirer")
const Metalsmith = require("metalsmith")
const Handlebars = require("handlebars")
const async = require("async")

Handlebars.registerHelper("if_eq", function(a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this)
})

function getDeskPath(project_name) {
    return path.join(process.cwd(), project_name)
}

function generate(templatePath, project_name, done) {
    const metalsmith = Metalsmith(templatePath)
    let opts
    try {
        opts = require(path.join(templatePath, "/meta.js"))
    } catch (e) {
        console.log(e)
        return
    }
    metalsmith
        .source("template")
        .metadata({
            name: project_name
        })
        .destination(getDeskPath(project_name))
        .use(askQuestions(opts.prompts))
        .use(filter(opts.filters))
        .use(renderTemplate())
        .build(err => {
            done(err)
        })
}

function askQuestions(prompts) {
    return (files, metalsmithd, done) => {
        ask(prompts, metalsmithd.metadata(), done)
    }
}

function installDep() {
    return (files, metalsmith, done) => {
        const metadata = metalsmith.metadata()
        if (metadata.autoInstall) {
            switch (metadata.autoInstall) {
                case "npm":

                    break
                case "yarn":

                    break
                default:
                    done()
                    break
            }
            return 
        }
        done()
    }
}

function renderTemplate() {
    return (files, metalsmith, done) => {
        let keys = Object.keys(files)
        const metalsmithMetadata = metalsmith.metadata()
        async.each(
            keys,
            (key, next) => {
                const source = files[key].contents.toString()
                if (!/{{([^{}]+)}}/g.test(source)) {
                    return next()
                }
                const template = Handlebars.compile(source)
                try {
                    const str = template(metalsmithMetadata)
                    files[key].contents = Buffer.from(str)
                } catch (e) {
                    console.log(e)
                }
                next()
            },
            done
        )
    }
}

function ask(prompts, metadata, done) {
    async.eachSeries(
        Object.keys(prompts),
        (key, next) => {
            prompt(metadata, key, prompts[key], next)
        },
        done
    )
}

function prompt(metadata, key, prompt, done) {
    inquirer
        .prompt([
            {
                type: prompt.type,
                name: key,
                message: prompt.message || prompt.label || key,
                default: prompt.default,
                choices: prompt.choices || [],
                validate: prompt.validate || (() => true)
            }
        ])
        .then(answers => {
            if (Array.isArray(answers)) {
                answers.forEach(answer => {
                    metadata[key][answer] = true
                })
            } else if (typeof answers[key] === "string") {
                metadata[key] = answers[key].trim()
            } else {
                metadata[key] = answers[key]
            }
            done && done()
        })
}

/**
 * @description 过滤文件
 * @author gujy
 * @date 2019-07-10
 * @param {Array} files
 */
function filter(filters) {
    return (files, metalsmith, done) => {
        const metadata = metalsmith.metadata()
        if (!filters) {
            return done()
        }
        const filePaths = Object.keys(files)
        const filterNames = Object.keys(filters)
        filePaths.forEach((filePath, index) => {
            filterNames.forEach(filterName => {
                if (new RegExp(filterName).test(filePath)) {
                    if (!metadata[filters[filterName]]) {
                        delete files[filePaths[index]]
                    }
                }
            })
        })
        done()
    }
}

module.exports = {
    generate: generate
}
