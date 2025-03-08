import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "job", 
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user", 
			required: true,
		},
		userTechSkills: {
			type: [String],
			required: true,
		},
		userSoftSkills: {
			type: [String],
			required: true,
		},
		userResume: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export const applicationModel = mongoose.model("application", schema);
