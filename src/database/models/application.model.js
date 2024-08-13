import mongoose from "mongoose";
import jobModel from "./job.model.js";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: "job",
  },

  userId: {
    type: mongoose.Types.ObjectId,
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
   
  },
});

applicationSchema.post("findOneAndDelete", async function (doc) {
  await jobModel.deleteMany({ addedBy: doc._id });
});


const applicationModel = mongoose.model("application", applicationSchema);

export default applicationModel;
