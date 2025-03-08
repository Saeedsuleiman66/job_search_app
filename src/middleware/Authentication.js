import jwt from "jsonwebtoken";

import { catchError } from "./CatchError.js";
import { userModel } from "../../database/models/user.model.js";
import AppError from "../utils/AppError.js";

const authMiddleware = catchError(async (req, res, next) => {
	const token = req.header("token");

	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const user = await userModel.findById(decoded.userId);
	if (!user) {
		return new AppError("User not found", 404);
	}
	req.user = user;
	next();
});

export { authMiddleware };
