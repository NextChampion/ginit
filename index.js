const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');

const files = require('./lib/files');

// 先清空屏幕，然后展示一个banner
clear();
console.log(
    chalk.yellow(
        figlet.textSync('Ginit', { horizontalLayout: 'full' })
    )
);

// 运行简单的检查，确保当前目录不是 Git 仓库
if(files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository!'));
    process.exit();
}

const run = async () => {
    const credentials = await inquirer.askGithubCredentials();
    console.log(credentials);
}

run();
