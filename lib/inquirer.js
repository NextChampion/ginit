/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2019-12-07 14:42:01
 * @LastEditTime: 2019-12-08 13:31:54
 * @LastEditors: zhangcunxia
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
     }
 }