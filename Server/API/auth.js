const router = require("express").Router();
const user = require("../Connections/user");
const isValidPassword = require("../Helpers/hash").isValidPassword;
const generateAuthToken = require("../Helpers/jwt").signJWT;
// Login route
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDetail = await user.FindUser(
      {
        password: 1,
        uid: 1,
        r_token: 1,
      },
      email
    );
    if (!userDetail) return res.status(401).json({ status: "invalid email" });
    const isMatch = await isValidPassword(userDetail.password, password);
    if (!isMatch) return res.status(401).json({ status: "invalid password" });
    const token = generateAuthToken({ uid: userDetail.uid });
    res.status(200).json({
      status: "login successful",
      a_token: token,
      r_token: userDetail.r_token,
    });
  } catch (error) {
    res.status(500).json({ status: "cannot process login request." });
  }
};
router.post("/login", login);
module.exports = router;
