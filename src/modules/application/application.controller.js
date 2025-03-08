
import { applicationModel } from "../../../database/models/application.model.js";
import { catchError } from "../../middleware/CatchError.js";

const createApplication = catchError(async (req, res, next) => {
    // Extract file name from request
    const fileName = req.file.filename;

    // Remove CV field from the request body
    delete req.body.CV;

    // Construct application object with file name
    const application = new applicationModel({
        ...req.body,
        userResume: fileName // Assign file name to userResume field
    });

    // Save application to the database
    await application.save();

    // Send response
    res.json({ message: "success", application });
});
const update_application = catchError(async (req, res, next) => {
	uploadSingleFile(req, res, async (err) => {
		if (err) {
			return next(new AppError(err.message, 400));
		}
		
		// Retrieve updated application data from request body
		const updateData = { ...req.body };
		
		// Check if file is uploaded and add it to update data
		if (req.file) {
			updateData.pdf = req.file.filename;
		}
		
		// Find and update the application
		const application = await applicationModel.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true }
		);
		
		// Check if application is found and send response
		if (!application) {
			return next(new AppError("Application not found", 404));
		}
		res.json({ message: "success", application });
	});
});

const deleteApplication = catchError(async (req, res, next) => {
	let application = await applicationModel.findByIdAndDelete(req.params.id);
	!application && res.status(404).json({ message: "Application not found" });
	application && res.json({ message: "success", application });
});
const getApplication = catchError(async (req, res, next) => {
	let application = await applicationModel.findById(req.params.id);
	!application && res.status(404).json({ message: "Application not found" });
	application && res.json({ message: "success", application });
});
export {
	createApplication,
	update_application,
	deleteApplication,
	getApplication,
};
