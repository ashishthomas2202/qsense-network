const express = require("express");
const router = express.Router();

const { all, add, update } = require("../controllers/devices");

router.get("/:userId/:accountId/all", all);
router.post("/:userId/:accountId/add", add);
router.post("/:userId/:accountId/:deviceId/update", update);

module.exports = router;
