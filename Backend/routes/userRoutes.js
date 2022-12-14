const express = require("express");
const router = express.Router();

const authMiddleware  = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
router.post("/", registerUser());
router.post("/login", loginUser());
router.get("/", authMiddleware, getUser());

// router.route("/").get()

module.exports = router;
