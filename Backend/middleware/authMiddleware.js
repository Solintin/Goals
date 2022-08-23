const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token
      token = req.headers.authorization.split(" ")[1];

      //Verify Token

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      //GEt user from token
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token provided");
  }
});

module.exports = authMiddleware;
