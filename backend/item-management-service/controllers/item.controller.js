import axios from "axios";
import itemService from "../services/item.service.js";
import searchItems from "../services/search.service.js";
import itemValidation from "../services/validation.service.js";

const createItem = async (req, res) => {
  try {
    // Check if the user has logged in if not throw an error
    if (!req.body.token) {
      throw new Error("No token provided!");
    }

    // Get the user ID from the token and add it to the request body
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

      req.body.role = response.data.data.role;
      req.body.userId = response.data.data._id;
      req.body.username = response.data.data.username;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    if (req.body.role !== "seller") {
      throw new Error("You are not authorized to create items!");
    }

    const item = new itemValidation(req);

    // Validate the request body
    await item.validate();

    const newItem = await itemService.createItem(item);

    res.status(200).json({
      status: "success",
      message: "Item created successfully!",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await itemService.getItems();

    res.status(200).json({
      status: "success",
      message: "Items fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getItemsByUserId = async (req, res) => {
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

    const items = await itemService.getItemsByUserId(req.body.userId);

    res.status(200).json({
      status: "success",
      message: "Items fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getItemsById = async (req, res) => {
  try {
    const item = await itemService.getItemsById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Item fetched successfully!",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const searchItemsByTerm = async (req, res) => {
  try {
    const items = await searchItems(req.body.searchTerm);

    res.status(200).json({
      status: "success",
      message: "Items fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateItemById = async (req, res) => {
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

    const itemNeedsToUpdate = await itemService.getItemsById(req.params.id);

    // Check if the user is the owner of the item before updating it
    if (itemNeedsToUpdate.userId !== req.body.userId) {
      throw new Error("You are not the owner of this item!");
    }

    const item = new itemValidation(req);
    const updateditem = await itemService.updateItemById(req.params.id, item);

    res.status(200).json({
      status: "success",
      message: "Item updated successfully!",
      data: updateditem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteItemById = async (req, res) => {
  try {
    await itemService.deleteItemById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Item deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createItem,
  getItems,
  getItemsByUserId,
  getItemsById,
  searchItemsByTerm,
  updateItemById,
  deleteItemById,
};
