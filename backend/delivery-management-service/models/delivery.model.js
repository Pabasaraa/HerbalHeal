import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  trackingId: { type: String, required: true },
  status: { type: String, required: true },
});

const deliveryModel = mongoose.model("Delivery", deliverySchema);

export default deliveryModel;
