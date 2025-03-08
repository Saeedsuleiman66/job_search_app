import express from "express";
import { Signup, login } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { LoginSchemaVal, SignupValSchema } from "./auth.validation.js";
import { validation } from "../../middleware/Validation.js";

const authRouter = express.Router();
authRouter.post("/signup", validation(SignupValSchema), checkEmail, Signup);
authRouter.post("/login", validation(LoginSchemaVal), login);
export default authRouter;
