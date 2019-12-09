const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const Configstore = require('configstore');

const inquirer = require('./lib/inquirer');
const github = require('./lib/github');
const files = require('./lib/files');

const conf = new Configstore('ginit');

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
    let token = github.getStoredGithubToken();
    if (!token) {
        await github.setGithubCredentials();
        token = await github.registerNewToken();
    }
    const credentials = await inquirer.askGithubCredentials();
    console.log(credentials, conf);
}

run();
