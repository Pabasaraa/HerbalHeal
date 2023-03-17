import itemModel from "../models/item.model.js";

async function searchItems(searchTerm) {
  try {
    return await itemModel.find({
      $or: [
        { itemName: { $regex: searchTerm, $options: "i" } },
        { itemDescription: { $regex: searchTerm, $options: "i" } },
      ],
    });
  } catch (error) {
    throw new Error("Error while searching items: " + error);
  }
}

export default searchItems;
