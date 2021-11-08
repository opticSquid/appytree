const router = require("express").Router();
const user = require("../Connections/user");
const hash = require("../Helpers/hash");
const jwt = require("../Helpers/jwt");
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
    const isMatch = await hash.isValidPassword(userDetail.password, password);
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
    const r_token = jwt.signJWT(
      { uid: uid, ip: ip },
      process.env.JWT_REF_SECRET
    );
    const a_token = jwt.signJWT(
      { uid: uid, ip: ip },
      process.env.JWT_ACS_SECRET,
      900
    );
    r_token = "bearer" + " " + r_token;
    a_token = "bearer" + " " + a_token;
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

//logout route
const endSession = async (req, res) => {
  try {
    await user.TerminateSessoin(res.locals.info.uid);
    if (user) {
      res.status(200).json({ status: "logout success" });
    } else {
      res.status(500).json({ status: "cannot process logout request." });
    }
  } catch (err) {
    res.status(500).json({ status: "cannot process logout request." });
    res.end();
  }
};
router.delete("/logout", jwt.gateKeeper, endSession);
(module.exports = router), signup;
