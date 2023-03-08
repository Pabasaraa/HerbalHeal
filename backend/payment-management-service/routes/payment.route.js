import express from "express";
import paymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/new").post(paymentController.createPayment);
router.route("/get").get(paymentController.getPaymentByUserId);
router.route("/update").put(paymentController.updatePaymentByUserId);
router.route("/delete").delete(paymentController.deletePaymentByUserId);
// TODO: Add payment processing functionality

export default router;
