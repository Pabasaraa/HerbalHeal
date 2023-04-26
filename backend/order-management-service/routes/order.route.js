import express from "express";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:orderId", orderController.getOrderById);
router.put("/orders/:orderId", orderController.updateOrder);
router.delete("/orders/:orderId", orderController.deleteOrder);
router.patch("/orders/:orderId/verify", orderController.verifyOrder);

export default router;
