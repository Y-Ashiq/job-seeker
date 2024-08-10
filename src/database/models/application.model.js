import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: [mongoose.Types.ObjectId],
    ref: "job",
  },

  userId: {
    type: [mongoose.Types.ObjectId],
    ref: "user",
  },
  userTechSkills: {
    type: [],
  },
  userSoftSkills: {
    type: [],
  },
  userResume: {
    type: String,
    unique: true,
    required: true,
  },
});

const applicationModel = mongoose.model("application", applicationSchema);

export default applicationModel;
