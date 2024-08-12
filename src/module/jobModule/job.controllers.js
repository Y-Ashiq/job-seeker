import companyModel from "../../database/models/company.model.js";
import jobModel from "../../database/models/job.model.js";
import { handleError } from "../../middleware/handleError.js";

const addJob = handleError(async (req, res, next) => {
  const job = await jobModel.create(req.body);

  res.status(200).json({ message: "job added", job });
});
const updateJob = handleError(async (req, res, next) => {
  const job = await jobModel.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "job updated", job });
});
const deleteJob = handleError(async (req, res, next) => {
  const job = await jobModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "job deleted", job });
});

const getAllJob = handleError(async (req, res, next) => {
  const search = req.query.search;
  

  const findJob = await jobModel
    .find({})
    .populate({
      path: "addedBy",
      select: "userName email",
    })
    .lean();

    
    const jobs = [];
    
    for (const key of findJob) {
    const querySearch = [{ companyHR: key.addedBy._id }, { companyName: search }];
    const company = await companyModel
      .find(search ? querySearch[1]: querySearch[0])
      .select("-companyHR");

    if (company[0] === undefined) {
      jobs.push(null);
    } else {
      jobs.push({ ...key, company: company[0] });
    }
  }

  res.status(200).json({ message: "jobs", jobs });
});

export default { addJob, updateJob, deleteJob, getAllJob };
