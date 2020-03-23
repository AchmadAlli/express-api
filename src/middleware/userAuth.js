require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) throw new Error();

    req.userToken = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("please login first");
  }
};

module.exports = userAuth;
