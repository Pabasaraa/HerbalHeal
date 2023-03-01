import mongoose from "mongoose";

export async function connectDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  // Open the connection
  db.once("open", () => {
    console.log("MongoDB connected");
  });
}
