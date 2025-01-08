const express = require("express");
const router = express.Router();
const pickupRequestController = require("../controller/pickupRequest");
const upload = require("../middleware/upload");

router
  .get("/", pickupRequestController.getAllPickupRequest)
  .get("/:id", pickupRequestController.getDetailPickupRequest)
  .post("/", upload, pickupRequestController.createPickupRequest)
  .put("/:id", pickupRequestController.updatePickupRequest)
  .delete("/:id", pickupRequestController.deletePickupRequest);

module.exports = router;
