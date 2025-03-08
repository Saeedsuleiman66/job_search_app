import express from "express";
import { addCompany, deleteCompany, getApplicationsForJobs, getCompanyData,  searchCompaniesByName, updateCompany } from "./Company.controller.js";
import { authMiddleware } from "../../middleware/Authentication.js";
import { authorize } from "../../middleware/authorization.js";
import { validation } from "../../middleware/Validation.js";
import { addCompanyValidationSchema, paramsIdVal, updateCompanyValidationSchema } from "./Company.validation.js";

const companyRouter = express.Router();

companyRouter
    .route("/")
    .post(authMiddleware,authorize( "Company_HR"),validation(addCompanyValidationSchema),addCompany)
//=====================================//
companyRouter.get("/search", authMiddleware, authorize('Company_HR', 'User'), searchCompaniesByName);
 companyRouter.get("/jobs/:jobId/applications", authMiddleware, authorize("Company_HR"), getApplicationsForJobs);
//=====================================//
companyRouter
    .route("/:id")
    .put(authMiddleware,authorize( "Company_HR"),validation(updateCompanyValidationSchema),updateCompany)
    .delete(authMiddleware,authorize( "Company_HR"),validation(paramsIdVal),deleteCompany)
    .get(authMiddleware,authorize( "Company_HR"),validation(paramsIdVal),getCompanyData)
   

export default companyRouter;
