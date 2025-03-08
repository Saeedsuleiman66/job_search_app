import AppError from "../utils/AppError.js";

export const validation = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(
			{
				...req.body,
				...req.params,
				...req.query,
			},
			{ abortEarly: false },
		);
		if (error) {
			let errMSg = [];
			error.details.forEach((val) => {
				errMSg.push(val.message);
			});
			next(new AppError(errMSg, 401));
		}
		next();
	};
};
