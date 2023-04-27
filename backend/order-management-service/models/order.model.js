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
    type: Object,
    required: true,
  },
  orderedItems: {
    type: [Object],
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  shippingOption: {
    type: String,
  },
  status: {
    type: String,
    default: "Processing",
  },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
