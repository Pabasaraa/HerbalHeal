import express from "express";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/orders/new", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.get("/orders/user/:id", orderController.getOrdersByUserId);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);
router.patch("/orders/:id/verify", orderController.verifyOrder);

export default router;
