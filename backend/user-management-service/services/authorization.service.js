import jwt from "jsonwebtoken";

const jwtValidate = (req, res, next) => {
  const token = req.headers["x-access-token"];
  // For API testing use below line of code comment out above line
  // const token = req.body.token;

  if (!token) {
    return res.status(403).json("No token provided!");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      console.log(`User ${decoded.username} is authorized!`);
      next();
    } catch (error) {
      res
        .status(500)
        .json("Failed to authenticate token. Error: " + error.message);
    }
  }
};

export default jwtValidate;
