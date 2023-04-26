import express from "express";
import DeliveryController from "../controllers/delivery.controller.js";

const router = express.Router();

router.post("/orders", DeliveryController.createOrder);
router.get("/orders/:trackingId", DeliveryController.getOrderByTrackingId);
router.put("/orders/:trackingId", DeliveryController.updateOrderStatus);

export default router;
