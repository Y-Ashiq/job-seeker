import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

export default connectDB;