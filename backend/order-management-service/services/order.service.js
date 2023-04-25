const axios = require('axios');
const Order = require('../models/orderModel');

const ordersUrl = 'http://localhost:8000/orders-service';

exports.createOrder = async (order) => {
  try {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateOrder = async (orderId, updates) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, {
      new: true,
    });
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteOrder = async (orderId) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.verifyOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.verified = true;
      const updatedOrder = await order.save();
      return updatedOrder;
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
