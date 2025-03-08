import { companyModel } from "../../../database/models/company.model.js";
import { jobModel } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/CatchError.js";
import AppError from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/features.js";
//========================add job=======================//
const addJob = catchError(async (req, res, next) => {
	let job = new jobModel(req.body);
    const company = await companyModel.findById(req.body.company);
    if (!company) {
        return next(new AppError("Company not found.", 404));
    }
	await job.save();
	res.json({ message: "success", job });
});
//======================delete job=====================//
const deleteJob = catchError(async (req, res, next) => {
	let job = await jobModel.findByIdAndDelete(req.params.id);
	!job && res.status(404).json({ message: "job not found" });
	job && res.json({ message: "success", job });
});
//====================update job=====================//
const updateJob = catchError(async (req, res, next) => {
	let job = await jobModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	!job && res.status(404).json({ message: "job not found" });
	job && res.json({ message: "success", job });
});
//================get all jobs==================//
const getAllJobsWithCompanyInfo = catchError(async (req, res) => {
	const jobs = await jobModel.find().populate("company");
	res.status(200).json({ jobs });
});
//==================get company jobs================//
const getCompanyJobs = catchError(async (req, res, next) => {
    // Extract the company name from the query parameters
    const companyName = req.query.companyName;

    // Find the company in the database
    const company = await companyModel.findOne({ companyName });

    // If the company is not found, return an error
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    // Find all jobs associated with the company
    const jobs = await jobModel.find({ company: company._id });

    // Return the list of jobs in the response
    res.json({ message: "success", jobs });
});
//===========================job search by filter=================//
const getJobsByFilters =catchError( async (req, res) => {
	let apiFeatures = new ApiFeatures(jobModel.find(), req.query)
	.pagination()
	.fields()
	.sorting()
	.search();
let jobs = await apiFeatures.mongooseQuery;
	
		res.json({ success: true, data: jobs });
	});

export { addJob, deleteJob, updateJob,getAllJobsWithCompanyInfo,getCompanyJobs,getJobsByFilters, };
