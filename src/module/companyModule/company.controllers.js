import companyModel from "../../database/models/company.model.js";
import { handleError } from "../../middleware/handleError.js";

const addCompany = handleError(async (req, res, next) => {
  await companyModel.create(req.body);

  res.json({ message: "company added successfully" });
});

const updateCompany = handleError(async (req, res, next) => {
  let id = req.params.id;

  let company = await companyModel.findByIdAndUpdate(id , req.body);

  res.status(200).json({ message: "company data updated", company });
});

const deleteCompany = handleError(async(req,res,next) => {


    let company = await companyModel.findByIdAndDelete(req.params.id)


    res.status(200).json({message:"company deleted successfully", company })



    
})

export default { addCompany, updateCompany , deleteCompany};
