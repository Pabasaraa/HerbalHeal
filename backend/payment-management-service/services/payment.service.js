import paymentModel from "../models/payment.model.js";

async function createPayment(payment) {
  try {
    const newPayment = new paymentModel(payment);
    return await newPayment.save();
  } catch (error) {
    throw new Error("Error while creating payment: " + error);
  }
}

async function getPaymentByUserId(id) {
  try {
    return await paymentModel.findOne({ userId: id });
  } catch (error) {
    throw new Error("Error while getting payment by user id: " + error);
  }
}

async function updatePaymentByUserId(id, payment) {
  try {
    return await paymentModel.findOneAndUpdate({ userId: id }, payment);
  } catch (error) {
    throw new Error("Error while updating payment by user id: " + error);
  }
}

async function deletePaymentByUserId(id) {
  try {
    return await paymentModel.findOneAndDelete({ userId: id });
  } catch (error) {
    throw new Error("Error while deleting payment by user id: " + error);
  }
}

export default {
  createPayment,
  getPaymentByUserId,
  updatePaymentByUserId,
  deletePaymentByUserId,
};
