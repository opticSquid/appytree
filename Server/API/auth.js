const router = require("express").Router();
const user = require("../Connections/user");
const isValidPassword = require("../Helpers/hash").isValidPassword;
const generateAuthToken = require("../Helpers/jwt").signJWT;
// Login route
const findExistingUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDetail = await user.FindUser(
      {
        password: 1,
        uid: 1,
      },
      email
    );
    if (!userDetail) return res.status(401).json({ status: "invalid email" });
    const isMatch = await isValidPassword(userDetail.password, password);
    if (!isMatch) {
      return res.status(401).json({ status: "invalid password" });
    } else {
      res.locals.user = userDetail;
      next();
    }
  } catch (error) {
    res.status(500).json({ status: "cannot process login request." });
    res.end();
  }
};
const startSession = async (req, res, next) => {
  try {
    const { uid } = res.locals.user;
    const ip = req.ip;
    const r_token = generateAuthToken(uid, ip);
    const a_token = generateAuthToken(uid, ip, 900);
    const session = await user.InitiateSession(uid, ip, r_token);
    if (session) {
      res.locals.session = { r: r_token, a: a_token };
      next();
    } else {
      res.status(500).json({ status: "cannot process login request." });
      res.end();
    }
  } catch (error) {
    res.status(500).json({ status: "cannot process login request." });
    res.end();
  }
};
const sendResponse = (req, res) => {
  const { r, a } = res.locals.session;
  res.status(200).json({ status: "login success", ref_tkn: r, acs_tkn: a });
};
router.post("/login", findExistingUser, startSession, sendResponse);
module.exports = router;
