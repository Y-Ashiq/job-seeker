import mongoose from "mongoose";

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
    type: String  },
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

const jobModel = mongoose.model("job", jobSchema);

export default jobModel;
