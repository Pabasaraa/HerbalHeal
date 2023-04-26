import DeliveryService from "../services/delivery.service.js";

class DeliveryController {
  static async createOrder(req, res, next) {
    try {
      const { trackingId, status } = req.body;
      const delivery = await DeliveryService.createOrder(trackingId, status);
      res.status(201).json(delivery);
    } catch (err) {
      next(err);
    }
  }

  static async getOrderByTrackingId(req, res, next) {
    try {
      const { trackingId } = req.params;
      const delivery = await DeliveryService.getOrderByTrackingId(trackingId);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (err) {
      next(err);
    }
  }

  static async updateOrderStatus(req, res, next) {
    try {
      const { trackingId } = req.params;
      const { status } = req.body;
      const delivery = await DeliveryService.updateOrderStatus(
        trackingId,
        status
      );
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (err) {
      next(err);
    }
  }
}

export default DeliveryController;
