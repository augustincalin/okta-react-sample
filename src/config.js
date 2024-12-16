const CLIENT_ID = process.env.CLIENT_ID || '0oa9lyg32nWWUU68y0x7';
const ISSUER = process.env.ISSUER || 'https://sprengnetter-de.oktapreview.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `http://localhost:3333/login/callback`;

// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    postLogoutRedirectUri: 'http://localhost:3333/logout',
  },
  resourceServer: {
    indicesUrl: 'http://localhost:5198/service/api/IndexOverview/GetIndexes',
  },
};
