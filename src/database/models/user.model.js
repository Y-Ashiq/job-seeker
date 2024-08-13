import mongoose from "mongoose";
import companyModel from "./company.model.js";
import applicationModel from "./application.model.js";
import jobModel from "./job.model.js";

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
    required: true,
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
  otpCode: String,
  otpExpire: Date,
});

userSchema.post("findOneAndDelete", async function (doc) {
  await jobModel.findOneAndDelete({ addedBy: doc._id });
  await applicationModel.findOneAndDelete({ userId: doc._id });
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
