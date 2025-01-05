const express = require("express");
const router = express.Router();
const pickupRequestRouter = require("./pickupRequest");
const usersRouter = require("../routes/users");

router.use("/pickup-request", pickupRequestRouter);
router.use("/users", usersRouter);

module.exports = router;
