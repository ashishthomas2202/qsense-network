const express = require("express");
const router = express.Router();

const { all } = require("../controllers/devices");

router.get("/:userId/:accountId/all", all);

module.exports = router;
