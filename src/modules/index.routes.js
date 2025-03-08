import companyRouter from "./Company/Company.routes.js";
import applicationRouter from "./application/application.routes.js";
import authRouter from "./auth/auth.routes.js";
import jobRouter from "./job/job.routes.js";
import userRouter from "./user/User.routes.js";

export const bootstrap = (app) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/user", userRouter);
	app.use("/api/v1/company", companyRouter);
	app.use("/api/v1/job", jobRouter);
	app.use("/api/v1/application", applicationRouter);
};
