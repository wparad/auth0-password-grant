#!/usr/bin/env node
/* eslint-disable node/shebang */

const commander = require('commander');
const path = require('path');
const Auth0 = require('../lib/auth0');

let version = require(path.join(__dirname, '../package.json')).version;
commander.version(version);

commander
.command('get-token')
.usage('[options]')
.option('-B, --bearer', 'Append Bearer to the response.', false)
.option('-X, --clip', 'Copy response to the clipboard.', false)
.option('-a, --audience [audience]', 'Target audience for returning tokens to be valid')
.option('-c, --client [client]', 'Client Id')
.option('-p, --password [password]', 'password')
.option('-u, --username [usernmae]', 'Specify the username.')
.option('-s, --url [url]', 'Authorization server url')
.option('-r, --realm [realm]', 'Target password realm to authenticate against')
.description('Get Auth0 Token')
.action(options => {
  let auth0 = new Auth0();
  let params = {
    username: options.username,
    password: options.password,
    audience: options.audience,
    clientId: options.client,
    realm: options.realm,
    url: options.url
  };

  auth0.getToken(params)
  .then(token => {
    let prefix = options.bearer ? 'Bearer ' : '';
    let fullToken = `${prefix}${token}`;
    console.log('TOKEN:', fullToken);
  })
  .catch(error => {
    console.log('Error: failed to retrieve access token.', `Details: ${error}`);
  });
});

commander.on('*', () => {
  if (commander.args.join(' ') === 'tests/**/*.js') { return; }
  console.log(`Unknown Command: ${commander.args.join(' ')}`);
  commander.help();
  process.exit(0);
});

if (!process.argv.find(e => e.match('get-token'))) {
  process.argv.splice(2, 0, 'get-token');
}

commander.parse(process.argv);
