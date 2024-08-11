import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enums: ["user", "HR"],
    default: "user",
  },
  status: {
    type: String,
    enums: ["online", "offline"],
    default: "offline",
  },
  otpCode :String,
  otpExpire: Date
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
