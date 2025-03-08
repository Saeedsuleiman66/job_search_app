import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		industry: {
			type: String,
			trim: true,
			required: true,
		},
		address: {
			type: String,
			trim: true,
			required: true,
		},
		numberOfEmployees: {
			type: String,
			enum: ["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "501+"],
			required: true,
		},
		companyEmail: {
			type: String,
			trim: true,
			unique: true,
		},
		companyHR: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user", // Reference to the User Collection (Assuming your user model is named 'user')e,
		},
	},
	{ timestamps: true },
);

export const companyModel = mongoose.model("company", schema);
