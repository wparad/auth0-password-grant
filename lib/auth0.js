const axios = require('axios');

class Auth0 {
  constructor() {}
  getToken(options) {
    let body = {
      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      username: options.username,
      password: options.password,
      audience: options.audience,
      scope: 'openid email',
      client_id: options.clientId,
      realm: options.realm
    };
    let headers = {
      'Content-Type': 'application/json'
    };
    return axios.post(options.url, body, headers).then(response => response.data)
    .then(result => {
      return result.access_token;
    });
  }
}
module.exports = Auth0;
