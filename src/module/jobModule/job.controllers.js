import companyModel from "../../database/models/company.model.js";
import jobModel from "../../database/models/job.model.js";
import applicationModel from "../../database/models/application.model.js";
import { handleError } from "../../middleware/handleError.js";

//*************************************************************************** */
/*                               add job 
this function api to handle creation of the job in DB 
//*************************************************************************** */

const addJob = handleError(async (req, res, next) => {
  const job = await jobModel.create(req.body);

  res.status(200).json({ message: "job added", job });
});

//*************************************************************************** */
/*                                update the job 
//*************************************************************************** */

const updateJob = handleError(async (req, res, next) => {
  const job = await jobModel.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "job updated", job });
});

//*************************************************************************** */
/*                               delete the job 
//*************************************************************************** */

const deleteJob = handleError(async (req, res, next) => {
  const job = await jobModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "job deleted", job });
});

//*************************************************************************** */
/*                               get all job of the company
used populate in addBy(hr) took the array of the jobModel.find() and loop
in the array if the search is by name of the company with the string query or
get all jobs of all the companies
//*************************************************************************** */

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
    const querySearch = [
      { companyHR: key.addedBy._id },
      { companyName: search },
    ];
    const company = await companyModel
      .find(search ? querySearch[1] : querySearch[0])
      .select("-companyHR");

    if (company[0] === undefined) {
      jobs.push(null);
    } else {
      jobs.push({ ...key, company: company[0] });
    }
  }

  res.status(200).json({ message: "jobs", jobs });
});

//*************************************************************************** */
/*                              filter the search by    
 workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills
    and  get all information of the company's job
//*************************************************************************** */

const filterJob = handleError(async (req, res, next) => {
  const {
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.query;

  let orConditions = [];

  if (workingTime) {
    orConditions.push({ workingTime });
  }
  if (jobLocation) {
    orConditions.push({ jobLocation });
  }
  if (seniorityLevel) {
    orConditions.push({ seniorityLevel });
  }
  if (jobTitle) {
    orConditions.push({ jobTitle });
  }
  if (technicalSkills) {
    const arr = JSON.parse(technicalSkills);
    orConditions.push({ technicalSkills: arr });
  }

  const findJob = await jobModel
    .find({ $or: orConditions })
    .populate({
      path: "addedBy",
      select: "userName email",
    })
    .lean();

  const jobs = [];

  for (const key of findJob) {
    const company = await companyModel
      .find({ companyHR: key.addedBy._id })
      .select("-companyHR");

    if (company[0] === undefined) {
      jobs.push(null);
    } else {
      jobs.push({ ...key, company: company[0] });
    }
  }

  res.status(200).json({ message: "jobs", jobs });
});

//*************************************************************************** */
/*             job application using file upload
//*************************************************************************** */

const applyJob = handleError(async (req, res) => {
  if (req.user.role === "HR") {
    return res.json("you are not allowed for this action");
  }

  req.body.resumeUrl = req.file.filename;
  req.body.userTechSkills = JSON.parse(req.body.userTechSkills);
  req.body.userSoftSkills = JSON.parse(req.body.userSoftSkills);

  await applicationModel.insertMany(req.body);

  res.status(200).json("done");
});

export default { addJob, updateJob, deleteJob, getAllJob, filterJob, applyJob };
