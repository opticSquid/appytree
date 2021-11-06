const bcrypt = require("bcrypt");
/**
 * @description Compares the plain text password with the hashed password.
 * @param {string} passHash - The hash of the password
 * @param {string} pass - The plain text password to check against the hash
 * @returns {boolean} True if the password matches the hash, false otherwise
 */
const matchpass = async (passHash, pass) => {
  let result;
  bcrypt.compare(pass, passHash, (err, compareResult) => {
    if (err) {
      console.log(err);
      result = false;
      return result;
    } else {
      result = true;
      console.log(compareResult);
      return result;
    }
  });
};
/**
 * @description Hashes the password.
 * @param {string} pass - Plain text password to hash.
 * @param {*} saltRounds - Number of rounds to hash the password.
 * @returns {string} - The hashed password.
 */
const createHash = async (pass, saltRounds) => {
  bcrypt.hash(pass, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return null;
    } else {
      console.log(hash);
      return hash;
    }
  });
};

module.exports = { isValidPassword: matchpass, hashPassword: createHash };
