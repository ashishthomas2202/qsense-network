const { User } = require("../models/User");
const Account = require("../models/Account");
const Device = require("../models/Device");

exports.all = function (req, res) {
  const { userId, accountId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      if (user.accountId === accountId) {
        Account.findOne({ _id: accountId })
          .populate("devices")
          .then((account) => {
            res.json({
              _id: accountId,
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

exports.add = function (req, res) {
  const { userId, accountId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      console.log(user.accountId, accountId);
      if (user.accountId === accountId) {
        Account.findOne({ _id: accountId })
          .then((account) => {
            const { name, status, value, connected } = req.body;

            const device = new Device({
              name,
              status,
              value,
              connected,
            });

            device
              .save()
              .then((device) => {
                account.devices.push(device._id);
                account
                  .save()
                  .then(() => {
                    res.json({
                      device: device,
                      message: "Success",
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      error: err,
                      message: "Cant connect the device at this moment",
                    });
                  });
              })
              .catch((err) => {
                res.status(400).json({
                  error: err,
                  message: "Cant connect the device at this moment",
                });
              });

            logger.info(`add device: ${device}`);
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
