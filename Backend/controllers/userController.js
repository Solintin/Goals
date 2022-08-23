const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Creشte new user
//@route POST /api/users
//@access Public
const registerUser = () =>
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400);
      throw new Error(`Please add all fields`);
    }

    //Check if users already exist
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(400);
      throw new Error(`User already exist`);
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      return res.status(201).json({
        message: "user created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          token: genearteToken(newUser._id),
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user");
    }
  });

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = () =>
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if users exist
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(201).json({
        message: "user login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: genearteToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw new Error("invalid credentials");
    }
  });

//@desc Get user info
//@route GET /api/users/
//@access Private
const getUser = () =>
  asyncHandler(async (req, res) => {
    const { id } = req.user;

    const { _id, email, name, role } = await User.findById(id);
    // console.log(userProfile);
    return res.status(200).json({
      id,
      email,
      name,
      role,
    });
  });

//Genearte JWT

const genearteToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
};
