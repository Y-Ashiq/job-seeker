import jobModel from "../../database/models/job.model.js";
import { handleError } from "../../middleware/handleError.js";

const addJob = handleError( (req,res,next) => {


    const job = jobModel.create(req.body)

    res.status.json({message:"job added" , job})
    
})


export default {addJob}