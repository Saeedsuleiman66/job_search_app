import express from "express";
import {
	deleteAccount,
	generateResetpasswordNumber,
	getAllAccountsByRecoveryEmail,
	getProfileDataForUser,
	resetPassword,
	updatePassword,
	update_Account,
	userData,
} from "./user.controller.js";
import { authMiddleware } from "../../middleware/Authentication.js";
import {
	emailValidationSchema,
	paramsIdVal,
	resetPasswordValidationSchema,
	update_Account_ValidationSchema,
	update_password_ValidationSchema,
} from "./User.validation.js";
import { validation } from "../../middleware/Validation.js";

const userRouter = express.Router();

userRouter
	.route("/")
	.put(
		validation(update_Account_ValidationSchema),
		authMiddleware,
		update_Account,
	)
	.delete(authMiddleware, deleteAccount)
	.get(authMiddleware, userData);
//==============================================//
userRouter.post(
	"/generateResetPasswordNumber",
	authMiddleware,
	validation(resetPasswordValidationSchema),
	generateResetpasswordNumber,
);
userRouter.post(
	"/resetPassword",
	authMiddleware,
	validation(emailValidationSchema),
	resetPassword,
);
userRouter.put(
	"/updatePassword",
	validation(update_password_ValidationSchema),
	authMiddleware,
	updatePassword,
);
userRouter.get("/accounts/:recoveryEmail", authMiddleware, getAllAccountsByRecoveryEmail)
//=======================================================//

userRouter.route("/:id").get(validation(paramsIdVal), getProfileDataForUser);
export default userRouter;
