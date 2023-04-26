import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  orderedItems: {
    type: [String],
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
