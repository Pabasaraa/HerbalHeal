import itemModel from "../models/item.model.js";

async function createItem(item) {
  try {
    const newItem = new itemModel(item);
    return await newItem.save();
  } catch (error) {
    throw new Error("Error while creating item: " + error);
  }
}

async function getItems() {
  try {
    return await itemModel.find();
  } catch (error) {
    throw new Error("Error while getting items: " + error);
  }
}

async function getItemsByUserId(id) {
  try {
    return await itemModel.find({ userId: id });
  } catch (error) {
    throw new Error("Error while getting items by user id: " + error);
  }
}

async function getItemsById(id) {
  try {
    return await itemModel.findById(id);
  } catch (error) {
    throw new Error("Error while getting items by id: " + error);
  }
}

async function updateItemById(id, item) {
  try {
    return await itemModel.findOneAndUpdate({ _id: id }, item);
  } catch (error) {
    throw new Error("Error while updating item by id: " + error);
  }
}

async function deleteItemById(id) {
  try {
    return await itemModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error while deleting item by id: " + error);
  }
}

export default {
  createItem,
  getItems,
  getItemsByUserId,
  getItemsById,
  updateItemById,
  deleteItemById,
};
