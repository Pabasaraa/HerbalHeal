import axios from "axios";
import orderService from "../services/order.service.js";

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const newOrder = await orderService.createOrder(order);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updates = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, updates);
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    if (order) {
      const verifiedOrder = await axios.patch(
        `http://localhost:8000/verification-service/verify-order/${orderId}`
      );
      res.status(200).json(verifiedOrder.data);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  verifyOrder,
};
