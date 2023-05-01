const express = require("express");
const router = express.Router();

const { all, add, update, state } = require("../controllers/devices");

// api for control/status
router.get("/:userId/:accountId/all", all);
router.post("/:userId/:accountId/add", add);
router.put("/:userId/:accountId/:deviceId/update", update);

router.get("/:userId/:accountId/:deviceId/state", state);

module.exports = router;
