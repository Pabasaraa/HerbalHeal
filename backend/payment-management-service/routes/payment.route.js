import express from "express";
import paymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/new").post(paymentController.createPayment);

export default router;
