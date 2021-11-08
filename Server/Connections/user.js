const user = require("../Schema/user");
const activeUser = require("../Schema/actieUser");
/**
 * @description This function is used to find the user either by email or uid
 * @param {string} email -  email of the user
 * @param {string} uid - uid of the user
 * @param {object} required - object of the required fields
 * @returns {Promise<{email:string,uid:string,password:string,r_token:string}>} Details of the users account
 */
const findUser = async (required, email = undefined, uid = undefined) => {
  if (uid === undefined && email !== undefined) {
    const userDetail = await user.findOne(
      { Email: email },
      { _id: 0, __v: 0, ...required }
    );
    return userDetail;
  } else if (email === undefined && uid !== undefined) {
    const userDetail = await user.findOne(
      { uid: uid },
      { _id: 0, __v: 0, ...required }
    );
    return userDetail;
  } else {
    return null;
  }
};
/**
 * @description This function is used to initialte an active session / login session for a user.
 * @param {string} uid - UID of the user
 * @param {string} ip - IP of the user
 * @param {string} ref_tokn - Refresh token of the user
 * @returns {Promise<boolean>} Boolean value indicating wheather the login session is registered or not.
 */
const addActiveUer = async (uid, ip, ref_tokn) => {
  let newSession = new activeUser({ UID: uid, IP: ip, Ref_Tokn: ref_tokn });
  newSession.save((err, data) => {
    if (err) {
      console.error(err);
      return false;
    } else {
      console.log(data);
      return true;
    }
  });
};

module.exports = {
  FindUser: findUser,
  InitiateSession: addActiveUer,
};
