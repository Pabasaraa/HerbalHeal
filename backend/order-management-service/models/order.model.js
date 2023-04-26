import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  orderedItems: {
    type: [Object],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingOption: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
