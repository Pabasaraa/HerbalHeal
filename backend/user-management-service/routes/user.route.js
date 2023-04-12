import express from "express";
import userController from "../controllers/user.controller.js";
// const userController = require("../controllers/user.controller.js");

const router = express.Router();

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.userLogin);
router.route("/:id").get(userController.getUserById);
router.route("/delete").delete(userController.deleteUserById);
router.route("/validatetoken").post(userController.validateToken);

export default router;
