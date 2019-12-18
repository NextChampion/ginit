/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2019-12-07 14:42:12
 * @LastEditTime : 2019-12-18 17:05:07
 * @LastEditors  : zhangcunxia
 * @Description: Git仓库管理
 */
const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git')();
const CLI = require('clui');
const Spinner = CLI.Spinner;

const inquirer = require('./inquirer');
const gh = require('./github');

module.exports = {
    createRemoteRepo: async () => {
        const github = gh.getInstance();
        const answers = await inquirer.askRepoDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private'),
        };

        const status = new Spinner('Create remote repository...');
        status.start();

        try {
            const response = await github.repos.create(data);
            return response.data.ssh_url;
        } catch (error) {
            throw error;
        } finally {
            status.stop();
        }
    },
    createGitignore: async () => {
        const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');
        if (filelist.length) {
            const answers = await inquirer.askIgnoreFiles(filelist);
            if (answers.ignore.length) {
                fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
            } else {
                Touch('.gitignore');
            }
        } else {
            Touch('.gitignore');
        }
    },
    setupRepo: async (url) => {
        const status = new Spinner('Initializing local repository and pushing to remote...');
        status.start();

        try {
            await git.init().add('.gitignore').add('./*').commit('Initial commit').addRemote('origin', url).push('origin', 'master');
            return true;
        } catch (error) {
            throw error;
        } finally {
            status.stop();
        }
    },
}