import express from 'express';
import { addJob, deleteJob, getAllJobsWithCompanyInfo, getCompanyJobs, getJobsByFilters, updateJob } from './job.controller.js';
import { authMiddleware } from '../../middleware/Authentication.js';
import { authorize } from '../../middleware/authorization.js';
import { validation } from '../../middleware/Validation.js';
import { addJobValidationSchema, paramsIdVal} from './job.validation.js';


const jobRouter = express.Router();

jobRouter
    .route("/")
    .post(authMiddleware,authorize( "Company_HR"),validation(addJobValidationSchema),addJob)
    .get(authMiddleware,authorize( "Company_HR"),getAllJobsWithCompanyInfo)


jobRouter
    .route("/:id")
    .put(authMiddleware,authorize( "Company_HR"),updateJob)
    .delete(authMiddleware,authorize("User" ,"Company_HR"),validation(paramsIdVal),deleteJob)
    //==============================================//
    jobRouter.get("/jobs", authMiddleware, authorize("User","Company_HR"), getCompanyJobs);
    jobRouter.get("/filters",authMiddleware,authorize( "Company_HR","User"),getJobsByFilters)
export default jobRouter