const jwt = require("jsonwebtoken");
/**
 * @description Generates a token given a payload and a secret.The expiry time parameter is optional.
 * @param {string} payload - payload to be signed
 * @param {strig} secret - secret key
 * @param {string} expiry - expiry time
 * @returns {string} signed token
 */
const signToken = (payload, secret, expiry = undefined) => {
  if (expiry === undefined) {
    return jwt.sign(payload, secret);
  } else {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
};

/**
 * @description Verifies a token given a secret.
 * @param {string} token - token to be verified
 * @param {string} secret - secret key
 * @returns {object} decoded token
 */
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

module.exports = {
  signJWT: signToken,
  verifyJWT: verifyToken,
};
