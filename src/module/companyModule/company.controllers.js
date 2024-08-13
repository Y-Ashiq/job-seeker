import applicationModel from "../../database/models/application.model.js";
import companyModel from "../../database/models/company.model.js";
import jobModel from "../../database/models/job.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utility/appError.js";
import { Types } from "mongoose";

//*************************************************************************** */
/*           add company to the data base by HR only
//*************************************************************************** */
const addCompany = handleError(async (req, res, next) => {
  await companyModel.create(req.body);

  res.json({ message: "company added successfully" });
});

//*************************************************************************** */
/*                  update company data to the data base by HR only
//*************************************************************************** */

const updateCompany = handleError(async (req, res, next) => {
  let id = req.params.id;

  let company = await companyModel.findByIdAndUpdate(id, req.body);

  res.status(200).json({ message: "company data updated", company });
});

//*************************************************************************** */
/*                  delete company data from the data base by HR only
//*************************************************************************** */
const deleteCompany = handleError(async (req, res, next) => {
  let company = await companyModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "company deleted successfully", company });
});

//*************************************************************************** */
/*                  get all company jobs from the data base by HR only
//*************************************************************************** */

const getCompanyJobs = handleError(async (req, res, next) => {
  const company = await companyModel.findById(req.params.id);
  const HRid = req.company[0].companyHR;
  const jobs = await jobModel.find({ addedBy: HRid });

  res.status(200).json({ company, jobs });
});

//*************************************************************************** */
/*                  get  company information in params 
//*************************************************************************** */

const getCompany = handleError(async (req, res, next) => {
  const company = await companyModel.find({ companyName: req.params.name });

  if (company.length == 0) {
    next(new AppError("company not found", 404));
  } else {
    res.status(200).json(company);
  }
});

//*************************************************************************** */
/*                  get  company's application with user information 
//*************************************************************************** */

const getApplications = handleError(async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    next(new AppError("no application not found", 404));
  } else {
    const apps = await applicationModel
      .find({ jobId: req.params.id })
      .populate({
        path: "userId",
        select: " -password -_id",
      });

    if (apps.length == 0) {
      next(new AppError("no application not found", 404));
    } else {
      res.status(200).json(apps);
    }
  }
});
export default {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyJobs,
  getCompany,
  getApplications,
};
