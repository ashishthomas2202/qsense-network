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

exports.update = function (req, res) {
  const { userId, accountId, deviceId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      console.log(user.accountId, accountId);
      if (user.accountId === accountId) {
        Account.findOne({ _id: accountId })
          .then((account) => {
            Device.findOne({ _id: deviceId })
              .then((device) => {
                const { status } = req.body;
                device.status = status;

                device
                  .save()
                  .then((data) => {
                    logger.info(`device Updated: ${data}`);
                    res.json({
                      device: data,
                      message: "Successfully Updated",
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      error: err,
                      message: "Status cannot be update at this moment",
                    });
                  });
              })
              .catch((err) => {
                res
                  .status(400)
                  .json({ error: err, message: "Device Not Found" });
              });

            // const device = new Device({
            //   name,
            //   status,
            //   value,
            //   connected,
            // });

            // device
            //   .save()
            //   .then((device) => {
            //     account.devices.push(device._id);
            //     account
            //       .save()
            //       .then(() => {
            //         res.json({
            //           device: device,
            //           message: "Success",
            //         });
            //       })
            //       .catch((err) => {
            //         res.status(400).json({
            //           error: err,
            //           message: "Cant connect the device at this moment",
            //         });
            //       });
            //   })
            //   .catch((err) => {
            //     res.status(400).json({
            //       error: err,
            //       message: "Cant connect the device at this moment",
            //     });
            //   });

            // logger.info(`add device: ${device}`);
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

exports.state = function (req, res) {
  const { userId, accountId, deviceId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      console.log(user.accountId, accountId);
      if (user.accountId === accountId) {
        Account.findOne({ _id: accountId })
          .then((account) => {
            Device.findOne({ _id: deviceId })
              .then((device) => {
                logger.info(`device State: ${device}`);
                res.json({
                  device: device,
                  message: "Success",
                });
              })
              .catch((err) => {
                res
                  .status(400)
                  .json({ error: err, message: "Device Not Found" });
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
