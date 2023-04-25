const Delivery = require("../models/Delivery");

class DeliveryService {
  static async createOrder(trackingId, status) {
    const delivery = new Delivery({ trackingId, status });
    await delivery.save();
    return delivery;
  }

  static async getOrderByTrackingId(trackingId) {
    const delivery = await Delivery.findOne({ trackingId });
    return delivery;
  }

  static async updateOrderStatus(trackingId, status) {
    const delivery = await Delivery.findOneAndUpdate(
      { trackingId },
      { status },
      { new: true }
    );
    return delivery;
  }
}

module.exports = DeliveryService;
