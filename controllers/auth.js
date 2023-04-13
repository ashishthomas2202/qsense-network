const { User, validateUser } = require("../models/User");
const Account = require("../models/Account");

exports.signup = async function (req, res) {
  const result = await validateUser(req.body);

  if (result.err) {
    res.status(400).json({ error: result.err, message: result.message });
  } else {
    let firstName = req.body.firstName;
    firstName =
      firstName[0].toUpperCase() +
      (firstName.substring(1) ? firstName.substring(1).toLowerCase() : "");

    let lastName = req.body.lastName;
    lastName =
      lastName[0].toUpperCase() +
      (lastName.substring(1) ? lastName.substring(1).toLowerCase() : "");

    let user = new User({
      firstName: firstName,
      lastName: lastName,
      email: req.body.email,
      password: req.body.password,
    });

    user
      .save()
      .then((user) => {
        let account = new Account({ devices: [] });
        account.save();
        user.accountId = account._id;
        user.save();

        res.json({
          user,
        });
      })
      .catch((err) => {
        console.log("Error in creating user: ", err);

        res.status(502).json({
          error: err.errors,
          message: "Email address already Exists. Please try to Sign In ",
        });
      });
  }
};

exports.signin = function (req, res) {
  console.log("Signin controller: ", req.body);
  const { email, password } = req.body;

  if (!email) {
    return res.status(502).json({
      error: {
        path: "email",
      },
      message: "Email is required.",
    });
  } else if (!password) {
    res.status(502).json({
      error: {
        path: "password",
      },
      message: "Password is required.",
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        console.log("user found: ", user);

        let authorized = user.authenticate(password);

        if (!authorized) {
          res.status(502).json({
            error: {},
            message: "Invalid Email or password.",
          });
        } else {
          user.hashedPassword = undefined;
          user.salt = undefined;
          user.__v = undefined;

          res.json({ user: user, message: "Signed In Successfully" });
        }
      })
      .catch((err) => {
        console.log("error finding user: ", err);
        res.status(502).json({
          error: err,
          message: "Invalid Email or password.",
        });
      });
  }
};
