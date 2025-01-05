const express = require("express");
const router = express.Router();
const pickupRequestController = require("../controller/pickupRequest");

router
  .get("/", pickupRequestController.getAllPickupRequest)
  .get("/search", pickupRequestController.searching)
  .get("/:id", pickupRequestController.getDetailPickupRequest)
  .post("/", pickupRequestController.createPickupRequest)
  .put("/:id", pickupRequestController.updatePickupRequest)
  .delete("/:id", pickupRequestController.deletePickupRequest);

module.exports = router;
