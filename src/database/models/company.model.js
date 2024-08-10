import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  numberOfEmployees: {
    type: Number,
  },
  companyEmail: {
    type: String,
    unique: true,
    required: true,
  },
  companyHR: {
    type: [mongoose.Types.ObjectId],
    ref: "user",
  },
});

const companyModel = mongoose.model("company", companySchema);

export default companyModel;
