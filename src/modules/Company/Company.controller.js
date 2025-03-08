import { applicationModel } from "../../../database/models/application.model.js";
import { companyModel } from "../../../database/models/company.model.js";
import { catchError } from "../../middleware/CatchError.js";
import AppError from "../../utils/AppError.js";
//=============================add company============================//
const addCompany = catchError(async (req, res, next) => {
	let company = new companyModel(req.body);
	await company.save();
	res.json({ message: "success", company });

	res.status(201).json({ message: "Company added successfully" });
});
//================update company=============================//

const updateCompany = catchError(async (req, res, next) => {
	let company = await companyModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	!company && next(new AppError("Company not found", 404));
	company && res.json({ message: "success", company });
});
//==========================delete company========================//

const deleteCompany = catchError(async (req, res, next) => {
	let company = await companyModel.findByIdAndDelete(req.params.id);
	!company && res.status(404).json({ message: "company not found" });
	company && res.json({ message: "success", company });
});
//==========================get company data===========================//
const getCompanyData = catchError(async (req, res, next) => {
	const { companyId } = req.params;

	// Fetch the company data
	const company = await companyModel.findById(companyId);
	if (!company) {
		return next(new AppError("Company not found", 404));
	}

	// Fetch all jobs related to this company
	const jobs = await jobModel.find({ company: companyId });

	res.status(200).json({
		company,
		jobs,
	});
});
//=====================search companies by name===================//
const searchCompaniesByName = catchError(async (req, res, next) => {
	const { name } = req.query;
	const searchQuery = {
		companyName: { $regex: new RegExp(name, "i") }, // Case-insensitive search
	};
	const companies = await companyModel.find(searchQuery);
	res.json({ companies });
});
//======================Get all applications for specific Jobs=================//

const getApplicationsForJobs = catchError(async (req, res) => {
	const applications = await applicationModel
		.find({ jobId: req.params.jobId })
		.populate("userId", "firstName lastName email"); // Populate user data (firstName, lastName, email)

	const modifiedApplications = applications.map((application) => ({
		...application.toObject(),
		userId: {
			firstName: application.userId.firstName,
			lastName: application.userId.lastName,
			email: application.userId.email,
		},
	}));

	res.status(200).json({ applications: modifiedApplications });
});
export {
	addCompany,
	updateCompany,
	deleteCompany,
	getCompanyData,
	searchCompaniesByName,
	getApplicationsForJobs,
};
