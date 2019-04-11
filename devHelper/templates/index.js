const inquirer = require('inquirer');
const generator = require('custom-template-generator');

var prompt = inquirer.createPromptModule();

function run() {
    prompt([{
        type: "list",
        name: "type",
        message: "Choice module you want to create?",
        choices: ["page", "component", "element"]
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
                    dest: 'src/pages',
                    templateName: 'page',
                    wrapInFolder: false
                });
                break
            case "component":
                generator({
                    componentName: result.name,
                    customTemplatesUrl: './devHelper/templates',
                    dest: 'src/components',
                    templateName: 'component',
                    wrapInFolder: false
                });
                break
            case "element":
                break
        }

    })
};

run()