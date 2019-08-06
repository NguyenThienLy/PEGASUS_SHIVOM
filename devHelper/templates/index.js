const inquirer = require('inquirer');
const generator = require('custom-template-generator');
const _ = require("lodash")
const fs = require("fs")

var prompt = inquirer.createPromptModule();

function run() {
    prompt([{
        type: "list",
        name: "type",
        message: "Choice module you want to create?",
        choices: ["page", "component", "element","model"]
    }, {
        type: "input",
        name: "name",
        message: "What is file name?"
    }]).then((result) => {
        console.log("result: ", result)
        switch (result.type) {
            case "page":
                generator({
                    componentName: result.name,
                    customTemplatesUrl: './devHelper/templates',
                    dest: 'client/pages',
                    templateName: 'page',
                    wrapInFolder: false
                });
                break
            case "component":
                generator({
                    componentName: result.name,
                    customTemplatesUrl: './devHelper/templates',
                    dest: 'client/components',
                    templateName: 'component',
                    wrapInFolder: false
                });
                break
            case "element":
                break
            case "model":
                createModelTemplate(result.name)
                break
        }

    })
};


function createModelTemplate(name) {
    const result = generator({
        componentName: _.camelCase(name),
        customTemplatesUrl: './devHelper/templates',
        dest: './server',
        templateName: "model",
        wrapInFolder: false,
    });
    const controllerIndex = './server/controllers/index.ts'
    appendLine(controllerIndex, 'import', `import { ${_.upperFirst(_.camelCase(name))}Controller } from './crud/${_.camelCase(name)}Controller'`)
        .then(() => {
            return appendLine(controllerIndex, 'declare', `const ${_.camelCase(name)}Controller = new ${_.upperFirst(_.camelCase(name))}Controller()`)
        })
        .then(() => {
            return appendLine(controllerIndex, 'export', `\t${_.camelCase(name)}Controller,`)
        })
    const serviceIndex = './server/services/index.ts'
    appendLine(serviceIndex, 'import', `import { ${_.upperFirst(_.camelCase(name))}Service } from './crud/${_.camelCase(name)}Service'`)
        .then(() => {
            return appendLine(serviceIndex, 'declare', `const ${_.camelCase(name)}Service = new ${_.upperFirst(_.camelCase(name))}Service()`)
        })
        .then(() => {
            return appendLine(serviceIndex, 'export', `\t${_.camelCase(name)}Service,`)
        })
    const modelIndex = './server/models/index.ts'
    appendLine(modelIndex, 'export', `export * from './${_.camelCase(name)}'`)
}

function appendLine(file, sign, line) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                reject(err)
                return console.log(err);
            }
            const regex = new RegExp(`(\/\/ \<${sign}\>)`, 'g')
            var result = data.replace(regex, `${line}\n$1`);

            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) {
                    reject(err)
                    return console.log(err);
                }
                resolve()
            });
        });
    })

}

run()