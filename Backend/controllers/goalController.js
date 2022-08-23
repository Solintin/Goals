const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalsModel");
const User = require("../models/userModel");

//@desc Get Goals
//@route GEt /api/goals
//@access private



const getGoals = () =>
  asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json({ goals });
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
    const newGoal = await Goal.create({ goal, user: req.user.id });
    return res.status(201).json({ message: "Success", goal: newGoal });
  });

//@desc Update Goals
//@route PUT /api/goals/:id
//@access private
const updateGoal = () =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { goal } = req.body;
    const goalToUpdate = await Goal.findById(id);
    if (!goalToUpdate) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    //check if user owns this goalToUpdate
    if (goalToUpdate.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { goal },
      { new: true }
    );
    res.status(200).json({ updatedGoal });
  });

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = () =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const goalToUpdate = await Goal.findById(id);
    if (!goalToUpdate) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    //check if user owns this goalToUpdate
    if (goalToUpdate.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await Goal.findByIdAndDelete(id);

    res.status(200).json({ message: `Delete Goals ${req.params.id}` });
  });

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
