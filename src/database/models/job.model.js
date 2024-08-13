import mongoose from "mongoose";
import applicationModel from "./application.model.js";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },

  jobLocation: {
    type: String,
    required: true,
  },
  workingTime: {
    type: String,
    enums: ["partTime", "fullTime"],

    required: true,
  },
  seniorityLevel: {
    type: String,
    enums: ["junior", "mid-level", "senior", "team-lead", "CTO"],
  },
  jobDescription: {
    type: String,
  },
  technicalSkills: {
    type: [],
  },
  softSkills: {
    type: [],
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

jobSchema.post("findOneAndDelete", async function (doc) {

  await applicationModel.findOneAndDelete({ jobId: doc._id });
});

const jobModel = mongoose.model("job", jobSchema);

export default jobModel;
