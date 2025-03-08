import mongoose from "mongoose";
const schema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		recoveryEmail: {
			type: String,
			trim: true,
		},
		DOB: {
			type: Date,
			required: true,
		},
		mobileNumber: {
			type: String,
			unique: true,
		},
		role: {
			type: String,
			enum: ["User", "Company_HR"],
			default: "User",
		},
		status: {
			type: String,
			enum: ["online", "offline"],
			default: "offline",
		},
		resetPasswordNumber:{
			type:Number,
			default:undefined
		},
		application:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"application",
			default:undefined
		}
	},
	{ timestamps: true },
);

// Define a virtual field for the username
schema.virtual("username").get(function () {
	return `${this.firstName}${this.lastName}`;
});

// Apply the virtual field in the schema
schema.set("toJSON", { virtuals: true });

export const userModel = mongoose.model("user", schema);
