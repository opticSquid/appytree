const user = require("../Schema/user");
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

module.exports = {
  FindUser: findUser,
};
