const express = require("express");
const router = express.Router();

const { signup, signin, deviceSignin } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/signin/device", deviceSignin);

module.exports = router;
