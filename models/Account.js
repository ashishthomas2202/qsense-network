const mongoose = require("mongoose");
const Device = require("./Device");

const accountSchema = new mongoose.Schema({
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
});

const Account = new mongoose.model("Account", accountSchema);

module.exports = Account;
