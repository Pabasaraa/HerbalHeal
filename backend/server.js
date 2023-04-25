import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./database.js";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./user-management-service/routes/user.route.js";
import paymentRoutes from "./payment-management-service/routes/payment.route.js";
import itemRoutes from "./item-management-service/routes/item.route.js";
import reviewRoutes from "./review-management-service/routes/review.route.js";
import orderRoutes from "./order-management-service/routes/order.route.js"

// Load environment variables from .env file to the process.env object
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use("/items", itemRoutes);
app.use("/reviews", reviewRoutes);
app.use("/orders", orderRoutes);



// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
