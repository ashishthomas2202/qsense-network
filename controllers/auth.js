const { User, validateUser } = require("../models/User");

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

exports.signin = function (req, res) {};
