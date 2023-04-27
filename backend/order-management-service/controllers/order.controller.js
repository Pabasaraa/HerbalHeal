import axios from "axios";
import orderService from "../services/order.service.js";

const createOrder = async (req, res) => {
  try {
    // Check if the user has logged in if not throw an err
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    // Get the user ID from the token and add it to the request body
    try {
      const response = await axios.post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": req.body.token,
          },
        }
      );

      req.body.customerId = response.data.data._id;
      req.body.customerName = response.data.data.username;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const newOrder = await orderService.createOrder(req.body);

    res.status(200).json({
      status: "success",
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);

    if (order) {
      res.status(200).json({
        status: "success",
        message: "Order retrieved successfully",
        data: order,
      });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    // Check if the user has logged in if not throw an err
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    // Get the user ID from the token and add it to the request body
    try {
      const response = await axios.post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": req.body.token,
          },
        }
      );

      var userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const orders = await orderService.getOrdersByUserId(userId);

    if (orders) {
      res.status(200).json({
        status: "success",
        message: "Orders retrieved successfully",
        data: orders,
      });
    } else {
      throw new Error("Orders not found");
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
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
  verifyOrder,
};
