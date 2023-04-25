const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  trackingId: { type: String, required: true },
  status: { type: String, required: true },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
