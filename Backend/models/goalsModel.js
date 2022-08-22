const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    goal: {
      type: String,
      required: [true, "Please provide a goal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
