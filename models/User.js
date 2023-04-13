const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const yup = require("yup");

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
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    let password = this.encryptPassword(plainText).toString();
    return password == this.hashedPassword;
  },
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }

    try {
      return crypto.HmacSHA256(password, this.salt);
    } catch (err) {
      return { err };
    }
  },
};

const validateUser = (user) => {
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required.").min(1).max(50),
    lastName: yup.string().required("Last Name is required.").min(1).max(50),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email is invalid."),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be atleast 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
        "Password must contain atleast an uppercase character,a lowercase character,a number and a special character"
      ),
  });

  return schema
    .validate(user)
    .then((user) => user)
    .catch((err) => {
      console.log("yup error:", err);

      return { err, message: err.message };
    });
};

userSchema.plugin(uniqueValidator);

exports.User = new mongoose.model("User", userSchema);

exports.validateUser = validateUser;
