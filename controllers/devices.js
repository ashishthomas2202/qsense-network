const { User } = require("../models/User");
const Account = require("../models/Account");

exports.all = function (req, res) {
  const { userId, accountId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      if (user.accountId === accountId) {
        Account.findOne({ _id: accountId })
          .then((account) => {
            res.json({
              __id: accountId,
              devices: account.devices,
              message: "Success",
            });
          })
          .catch((err) => {
            res
              .status(400)
              .json({ error: err, message: "Invalid Credentials" });
          });
      } else {
        res.status(400).json({ error: {}, message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err, message: "Invalid Credentials" });
    });
};
