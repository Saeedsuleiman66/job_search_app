import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/CatchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//======================signup=================//
const Signup = catchError(async (req, res, next) => {
	req.body.password = bcrypt.hashSync(req.body.password, 8);
	const user = new userModel(req.body);
	await user.save();
	res.json({ message: "Success", user });
});

//=======================login==================//
const login = catchError(async (req, res, next) => {
	const { email, mobileNumber, password } = req.body;
	let user = await userModel.findOne({ $or: [{ email }, { mobileNumber }] });
	if (user && bcrypt.compareSync(password, user.password)) {
		user.status = "online";
		await user.save();
		let token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
		return res.json({ message: "success", token });
	}
	next(new AppError("incorrect email or password", 401));
});
export { Signup, login };
