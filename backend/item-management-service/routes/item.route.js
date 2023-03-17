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
router.route("/get/one/:id").get(itemController.getItemsById);
router.route("/search").get(itemController.searchItemsByTerm);
router.route("/delete/:id").delete(itemController.deleteItemById);
router
  .route("/update/:id")
  .put(upload.array("images"), itemController.updateItemById);

export default router;
