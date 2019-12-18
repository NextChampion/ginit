/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2019-12-07 14:42:08
 * @LastEditTime : 2019-12-18 17:05:17
 * @LastEditors  : zhangcunxia
 * @Description: access token 管理
 */

 const Octokit = require('@octokit/rest');
 const Configstore = require('configstore');
 const pkg = require('../package.json');
 const _ = require('lodash');
 const CLI = require('clui');
 const Spinner = CLI.Spinner;
 const chalk = require('chalk');

 const inquirer = require('./inquirer');

 const conf = new Configstore(pkg.name);

 module.exports = {
     getInstance: () => {
         return global.octokit;
     },

     getStoredGithubToken: () => {
        return conf.get('github.token');
     },

     setGithubCredentials: async () => {
         const credentials = await inquirer.askGithubCredentials();
         const result = _.extend(
            {
              type: "basic"
            },
            credentials
          );
          global.octokit = new Octokit({
            auth: {
                ...result,
                async on2fa () {
                    // example: ask the user
                    return prompt('Two-factor authentication Code:')
                }
            }
          });
     },

     registerNewToken: async () => {
          const status = new Spinner('Authenticating you, please wait...');
         status.start();
         try {
            const response = await global.octokit.oauthAuthorizations.createAuthorization({
                scopes: ["user", "public_repo", "repo", "repo:status"],
                note: "ginits, the command-line tool for initalizing Git repos"
            });
          const token = response.data.token;
             if (token) {
                 conf.set('github.token', token);
                 return token;
             } else {
                 throw Error('Missing Token', 'Github token was not found in the response');
             }
         } catch (error) {
          throw error;
         } finally {
             status.stop();
         }
     },

 }