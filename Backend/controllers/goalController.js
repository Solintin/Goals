const asyncHandler = require("express-async-handler");

//@desc Get Goals
//@route GEt /api/goals
//@access private
const getGoals = () =>
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Goals" });
  });

//@desc Set Goals
//@route POST /api/goals
//@access private
const setGoal = () =>
  asyncHandler(async (req, res) => {
    const { goal } = req.body;
    if (!goal) {
      res.status(400);
      throw new Error("Please provide a goal");
    }
    return res.status(201).json({ message: "Set Goals" });
  });

//@desc Update Goals
//@route PUT /api/goals/:id
//@access private
const updateGoal = () =>
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goals ${req.params.id}` });
  });

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = () =>
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goals ${req.params.id}` });
  });

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
