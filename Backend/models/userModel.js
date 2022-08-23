const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add a valid email address"],
      unique: true,
    },
    password: {
      type: {},
      required: [true, "Please add a valid password"],
    },
    name: {
      type: {},
      required: [true, "Please add a valid name"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema)