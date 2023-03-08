import axios from "axios";
import paymentService from "../services/payment.service.js";
import paymentValidation from "../services/validation.service.js";

const createPayment = async (req, res) => {
  try {
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/validatetoken",
        {},
        {
          headers: {
            "x-access-token": req.body.token,
          },
        }
      );
      req.body.userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const payment = new paymentValidation(req.body);

    await payment.validate();
    payment.encrypCardNumber();

    console.log(payment);
    const newPayment = await paymentService.createPayment(payment);

    res.status(200).json({
      status: "success",
      message: "Payment method created successfully!",
      data: newPayment,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getPaymentByUserId = async (req, res) => {
  try {
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/validatetoken",
        {},
        {
          headers: {
            "x-access-token": req.body.token,
          },
        }
      );
      req.body.userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const payment = await paymentService.getPaymentByUserId(req.body.userId);

    res.status(200).json({
      status: "success",
      message: "Payment method retrieved successfully!",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updatePaymentByUserId = async (req, res) => {
  try {
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/validatetoken",
        {},
        {
          headers: {
            "x-access-token": req.body.token,
          },
        }
      );

      req.body.userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const payment = new paymentValidation(req.body);

    await payment.validate();
    payment.encrypCardNumber();

    const updatedPayment = await paymentService.updatePaymentByUserId(
      req.body.userId,
      payment
    );

    res.status(200).json({
      status: "success",
      message: "Payment method updated successfully!",
      data: updatedPayment,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deletePaymentByUserId = async (req, res) => {
  try {
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/validatetoken",
        {},
        {
          headers: {
            "x-access-token": req.body.token,
          },
        }
      );
      req.body.userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    await paymentService.deletePaymentByUserId(req.body.userId);

    res.status(200).json({
      status: "success",
      message: "Payment method deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createPayment,
  getPaymentByUserId,
  deletePaymentByUserId,
  updatePaymentByUserId,
};
