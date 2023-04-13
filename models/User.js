const mongoose = require("mongoose");
const Account = require("./Account");
//User Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    account: Account.Schema,

    // salt: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
