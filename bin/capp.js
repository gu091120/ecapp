const program = require("commander")
const chalk = require("chalk")
const git_download = require("download-git-repo")
const ora = require("ora")
const rm = require("rimraf").sync
const fs = require("fs")
const path = require("path")
const { generate } = require("../lib/util")

const root_path = __dirname
const template_path = path.join(root_path, "../template/")

program
    .usage("init <template_name> [project_name]")
    .on("exit", () => {
        console.log()
    })
    .on("--help", () => {
        console.log("Examples:")
        console.log()
        console.log(chalk.gray("# create a new project"))
        console.log("$ capp init webpack my-project")
        console.log()
        console.log(chalk.gray("# show template list"))
        console.log("$ capp list")
        console.log()
    })

program
    .command("init <template_name> [project_name...] ")
    .description("init a new project")
    .action((template_name, project_name) => {
        getLocalTemplate(files => {
            if (!project_name[0]) {
                console.log("请输入项目名称")
                return
            }
            if (files.length === 0) {
                downloadTemplate(() => {
                    getLocalTemplate(files => {
                        checkGenerate(files, template_name, project_name[0])
                    })
                })
                return
            }
            checkGenerate(files, template_name, project_name[0])
        })
    })

program
    .command("list")
    .description("show all templates ")
    .action(() => {
        listTemplate()
    })

program
    .command("clear")
    .description("clear local templates ")
    .action(() => {
        claerTemplate()
    })

program
    .command("update")
    .description("update local templates ")
    .action(() => {
        claerTemplate()
        downloadTemplate()
    })

program.parse(process.argv)

/**
 * @description 构建前的检查
 * @author gujy
 * @date 2019-07-04
 * @param {*} files
 * @param {*} template_name
 * @param {*} project_name
 */
function checkGenerate(files, template_name, project_name) {
    if (files.indexOf(template_name) === -1) {
        console.log("template name error")
        listTemplate()
        return
    }
    const tmp_path = path.join(template_path, template_name)
    generate(tmp_path, project_name, err => {
        if (err) {
            console.log(err)
            return
        }
        console.log("项目搭建成功")
    })
}

/**
 * @description 查看本地template
 * @author gujy
 * @date 2019-07-04
 * @param {function} callbanck
 */
function getLocalTemplate(callbanck) {
    fs.readdir(template_path, (err, files) => {
        if (err) {
            if (err.errno === -2) {
                fs.mkdir(err.path, () => {
                    callbanck && callbanck([])
                })
                return
            }
            console.log(err)
            return
        }
        callbanck && callbanck(files)
    })
}

/**
 * @description 列出本地所有模版
 * @author gujy
 * @date 2019-07-04
 */
function listTemplate() {
    getLocalTemplate(files => {
        if (files.length === 0) {
            downloadTemplate(listTemplate)
            return
        }
        files.forEach(tmp => {
            console.log(`  ${chalk.yellow("*")}  ${chalk.green(tmp)}`)
        })
    })
}

/**
 * @description 下载远程模版
 * @author gujy
 * @date 2019-07-04
 * @param {*} callbanck
 */
function downloadTemplate(callbanck) {
    const sinner = ora("downloading template")
    sinner.start()
    git_download(
        "github:gu091120/my-template#master",
        template_path,
        { clone: false },
        e => {
            sinner.stop()
            if (e) {
                console.log(chalk.red(e))
                return
            }
            console.log(chalk.green("下载成功"))
            callbanck && callbanck()
        }
    )
}

/**
 * @description 删除本地模版
 * @author gujy
 * @date 2019-07-04
 */
function claerTemplate() {
    rm(template_path)
}
