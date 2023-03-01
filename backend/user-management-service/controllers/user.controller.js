import userService from "../services/user.service.js";
import userValidation from "../services/validation.service.js";

const createUser = async (req, res) => {
  const user = new userValidation(req.body);

  try {
    await user.validate();
    await user.hashPassword();

    const exists = await userService.checkExistence(user.email, user.username);

    if (exists) {
      throw new Error("User already exists!");
    }

    const newUser = await userService.createUser(user);

    res.status(200).json({
      status: "success",
      message: "Registration successful!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  createUser,
  getUserById,
};
