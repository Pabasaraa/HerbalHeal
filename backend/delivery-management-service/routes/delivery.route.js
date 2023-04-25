const express = require("express");
const router = express.Router();
const DeliveryController = require("../controllers/delivery");

router.post("/orders", DeliveryController.createOrder);
router.get("/orders/:trackingId", DeliveryController.getOrderByTrackingId);
router.put("/orders/:trackingId", DeliveryController.updateOrderStatus);

module.exports = router;
