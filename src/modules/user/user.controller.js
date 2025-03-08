import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/CatchError.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//=================update user================//
const update_Account = catchError(async (req, res, next) => {
	const userId = req.user.id;

	let user = await userModel.findById(userId);

	if (user._id.toString() !== userId) {
		return next(new AppError("Unauthorized", 401));
	}
	// Check if the new email conflicts with existing data
	if (email && email !== user.email) {
		const existingEmail = await userModel.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email already exists" });
		}
	}
	// Check if the new mobile number conflicts with existing data
	if (mobileNumber && mobileNumber !== user.mobileNumber) {
		const existingMobileNumber = await userModel.findOne({ mobileNumber });
		if (existingMobileNumber) {
			return res.status(400).json({ error: "Mobile number already exists" });
		}
	}
	user = new userModel(req.body);
	await user.save();
	res.json({ message: "Account updated successfully" });
});
//=======================delete user================//
const deleteAccount = catchError(async (req, res, next) => {
	const userId = req.user.id;
	const user = await userModel.findById(userId);
	if (user._id.toString() !== userId) {
		return next(new AppError("Unauthorized", 401));
	}
	await user.deleteOne();
	res.json({ message: "Account deleted successfully" });
});
//=======================det user data=======================//
const userData = catchError(async (req, res, next) => {
	const userId = req.user.id;
	const user = await userModel.findById(userId);
	if (user._id.toString() !== userId) {
		return next(new AppError("Unauthorized", 401));
	}
	res.json({ user });
});
//==============================getProfileDataForUser====================//
const getProfileDataForUser = catchError(async (req, res, next) => {
	let user = await userModel.findById(req.params.id);
	!user && res.status(404).json({ message: "user not found" });
	user && res.json({ message: "success", user });
});
//======================update password=============================//
const updatePassword = catchError(async (req, res, next) => {
	const userId = req.user.id;
	const { oldPassword, newPassword } = req.body;
	let isValidPassword = bcrypt.compareSync(oldPassword, req.user.password);
	if (!isValidPassword) {
		return next(new AppError("Incorrect old password", 401));
	}
	const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
	const updatedUser = await userModel.findByIdAndUpdate(
		userId,
		{ password: hashedNewPassword },
		{ new: true },
	);
	if (!updatedUser) {
		return next(new AppError("User not found or password not updated", 404));
	}
	res.json(updatedUser);
});
//=====================forget password===========================//
const generateResetpasswordNumber = catchError(async (req, res, next) => {
	const { email } = req.body;

	const user = await userModel.findOne({ email });
	if (!user) {
		return next(new AppError("User not found", 404));
	}
	const resetPasswordNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
	user.resetPasswordNumber = resetPasswordNumber;
	await user.save();
	res.json({
		message: "Reset password number generated successfully",
		resetPasswordNumber,
	});
});
const resetPassword = catchError(async (req, res, next) => {
	const { resetPasswordNumber, newPassword } = req.body;
	const user = await userModel.findOne({ resetPasswordNumber });
	if (!user) {
		return next(new AppError("Invalid reset password number", 400));
	}
	let hashedNewPassword = bcrypt.hashSync(newPassword, 8);
	user.password = hashedNewPassword;
	user.resetPasswordNumber = undefined;
	await user.save();
	res.json({ message: "Password reset successful" });
});
//===============================getAllAccountsByRecoveryEmail=================================//
const getAllAccountsByRecoveryEmail = catchError(async (req, res, next) => {
	const recoveryEmail = req.params.recoveryEmail;

	const users = await userModel.find({ recoveryEmail });

	if (!users || users.length === 0) {
		return res
			.status(404)
			.json({
				message: "No user accounts found with the specified recovery email",
			});
	}
	res.status(200).json({ users });
});
export {
	update_Account,
	deleteAccount,
	userData,
	getProfileDataForUser,
	updatePassword,
	generateResetpasswordNumber,
	resetPassword,
	getAllAccountsByRecoveryEmail,
};
