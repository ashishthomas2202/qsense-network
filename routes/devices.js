const express = require("express");
const router = express.Router();

const { all, add } = require("../controllers/devices");

router.get("/:userId/:accountId/all", all);
router.post("/:userId/:accountId/add", add);

module.exports = router;
