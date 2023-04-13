const { User, validateUser } = require("../models/User");

exports.signup = async function (req, res) {
  console.log("Signup controller", req.body);

  const result = await validateUser(req.body);

  if (result.err) {
    res.status(400).json({ error: result.err, message: result.message });
  } else {
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
