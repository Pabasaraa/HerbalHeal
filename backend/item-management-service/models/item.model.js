import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemImages: [
    {
      type: Buffer,
      required: true,
    },
  ],
});

const itemModel = mongoose.model("Item", itemSchema);

export default itemModel;
