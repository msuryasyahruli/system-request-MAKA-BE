const express = require("express");
const router = express.Router();
const pickupRequestRouter = require("./pickupRequest");
const usersRouter = require("../routes/users");

router.get("/", (req, res) => {
  res.send(`
      <h1>MAKA Project Rest API</h1>
      <p>Endpoint yang tersedia:</p>
      <ul>
        <li><a href="/pickup-request">/pickup-request</a></li>
        <li><a href="/users">/users</a></li>
      </ul>
    `);
});

router.use("/pickup-request", pickupRequestRouter);
router.use("/users", usersRouter);

module.exports = router;
