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
    type: String,
    enums: ["1-10", "11-20", "21-50", "51-100", "101-200"],
  },
  companyEmail: {
    type: String,
    unique: true,
    required: true,
  },
  companyHR: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const companyModel = mongoose.model("company", companySchema);

export default companyModel;
