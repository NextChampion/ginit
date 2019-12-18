/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2019-12-07 14:42:01
 * @LastEditTime : 2019-12-18 17:02:39
 * @LastEditors  : zhangcunxia
 * @Description: 命令行用户界面
 */

 const inquirer = require('inquirer');
 const files = require('./files');

//  inquirer.prompt() 向用户询问一系列问题，并以数组的形式作为参数传入。数组的每个元素都是一个对象，分别定义了name、 type和message属性。
// 用户提供的输入信息返回一个 promise 给调用函数。如果成功，我们会得到一个对象，包含username和password属性。
 module.exports = {
     askGithubCredentials: () => {
         const questions = [
             {
                 name: 'username',
                 type: 'input',
                 message: 'Enter your Github username or e-mail address',
                 validate: function (value) {
                     if (value.length) {
                         return true;
                     } else {
                         return "Please enter your username or email address.";
                     }
                 }
             },
             {
                 name: 'password',
                 type: 'password',
                 message: 'Enter your password',
                 validate: function (value) {
                     if (value.length) {
                         return true;
                     } else {
                         return 'Please enter yout password.';
                     }
                 }
             }
         ];
         return inquirer.prompt(questions);
     },
     askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository:',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: argv[1] || null,
                message: 'Optionally enter a description of the repository:',
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or private:',
                choices: ['public', 'private'],
                default: 'public',
            }
        ];
        return inquirer.prompt(questions);
     }
 }