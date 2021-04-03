const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const jwtAuthz = require('express-jwt-authz');

const DOMAIN = process.env.DOMAIN;
const API_IDENTIFIER = process.env.API_IDENTIFIER;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${DOMAIN}/.well-known/jwks.json`,
  }),

  audience: API_IDENTIFIER,
  issuer: `https://${DOMAIN}/`,
  algorithms: ['RS256'],
});

module.exports = { checkJwt };
