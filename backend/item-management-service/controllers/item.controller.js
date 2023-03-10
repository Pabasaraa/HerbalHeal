import axios from "axios";
import itemService from "../services/item.service.js";
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
      req.body.userId = response.data.data._id;
      req.body.username = response.data.data.username;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
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

const getItems = async (req, res) => {};

const getItemsByUserId = async (req, res) => {};

const getItemsById = async (req, res) => {};

const updateItemById = async (req, res) => {};

const deleteItemById = async (req, res) => {};

export default {
  createItem,
  getItems,
  getItemsByUserId,
  getItemsById,
  updateItemById,
  deleteItemById,
};
