import express from "express";
import multer from "multer";
import itemController from "../controllers/item.controller.js";

const router = express.Router();

// Set up multer storage for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/new").post(upload.array("images"), itemController.createItem);
router.route("/get/all").get(itemController.getItems);
router.route("/user/get").get(itemController.getItemsByUserId);
router.route("/get/one").get(itemController.getItemsById);
router.route("/update").put(itemController.updateItemById);
router.route("/delete").delete(itemController.deleteItemById);

export default router;
