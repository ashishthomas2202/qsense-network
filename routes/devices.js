const express = require("express");
const router = express.Router();

const {
  all,
  add,
  update,
  getState,
  updateSensor,
} = require("../controllers/devices");

// api for control/status
router.get("/:userId/:accountId/all", all);
router.post("/:userId/:accountId/add", add);
router.put("/:userId/:accountId/:deviceId/update", update);

router.get("/:userId/:accountId/:deviceId/state", getState);
router.put("/:userId/:accountId/:deviceId/sensor", updateSensor);

module.exports = router;
