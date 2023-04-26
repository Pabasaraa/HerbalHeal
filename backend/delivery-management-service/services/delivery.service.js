import deliveryModel from "../models/delivery.model.js";

class DeliveryService {
  static async createOrder(trackingId, status) {
    const delivery = new deliveryModel({ trackingId, status });
    await delivery.save();
    return delivery;
  }

  static async getOrderByTrackingId(trackingId) {
    const delivery = await findOne({ trackingId });
    return delivery;
  }

  static async updateOrderStatus(trackingId, status) {
    const delivery = await findOneAndUpdate(
      { trackingId },
      { status },
      { new: true }
    );
    return delivery;
  }
}

export default DeliveryService;
