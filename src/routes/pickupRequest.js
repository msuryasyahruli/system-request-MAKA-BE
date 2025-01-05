const express = require("express");
const router = express.Router();
const pickupRequestController = require("../controller/pickupRequest");
const upload = require("../middleware/upload");

router
  .get("/", pickupRequestController.getAllPickupRequest)
  .get("/search", pickupRequestController.searching)
  .get("/:id", pickupRequestController.getDetailPickupRequest)
  .post("/", upload, pickupRequestController.createPickupRequest)
  .put("/:id", upload, pickupRequestController.updatePickupRequest)
  .delete("/:id", pickupRequestController.deletePickupRequest);

module.exports = router;