const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  devices: [{ name: String, status: String, value: Number }],
});

const Account = new mongoose.model("Account", accountSchema);

module.exports = Account;
