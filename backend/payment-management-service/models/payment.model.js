import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  cardNumber: {
    type: Schema.Types.Mixed,
    required: true,
  },
  lastCardDigits: {
    type: String,
    required: true,
  },
  cardHolder: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  securityCode: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
});

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;
