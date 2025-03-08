import express from "express";

import { authMiddleware } from "../../middleware/Authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { validation } from "../../middleware/Validation.js";
import {
	addApplicationValidationSchema,
	paramsIdVal,
} from "./application.validation.js";
import {
	createApplication,
	deleteApplication,
	getApplication,
	update_application,
} from "./application.controller.js";
import { uploadSingleFile } from "../../Services/FileUploads.js/File_uploads.js";


const applicationRouter = express.Router();

applicationRouter.route("/");
applicationRouter.route("/").post(
	uploadSingleFile("CV"), // Add file upload middleware
	authMiddleware,
	authorize("User"),
	validation(addApplicationValidationSchema),
	createApplication, // Update the controller function name
);
//===============================================//


//===============================================//

applicationRouter
	.route("/:id")
	.put(
		uploadSingleFile("CV"),
		authMiddleware,
		authorize("User"),
		update_application,
	)
	.delete(
		uploadSingleFile("CV"), // Add file upload middleware
		authMiddleware,
		authorize("User"),
		validation(addApplicationValidationSchema),
		deleteApplication,
	)
	.get(
		authMiddleware,
		authorize("User"),
		validation(paramsIdVal),
		getApplication,
	);
export default applicationRouter;
