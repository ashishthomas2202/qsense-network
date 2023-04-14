const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    value: { type: Number, default: 0 },
    connected: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Device = new mongoose.model("Device", deviceSchema);

module.exports = Device;
