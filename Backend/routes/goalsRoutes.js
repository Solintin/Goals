const express = require("express");
const router = express.Router();
const authMiddleware  = require("../middleware/authMiddleware");

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(authMiddleware, getGoals()).post(authMiddleware, setGoal());
router.route("/:id").put(authMiddleware, updateGoal()).delete(authMiddleware, deleteGoal());

module.exports = router;
