import multer from 'multer';
import mongoose from 'mongoose';



export const fileUpload = () => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null,'uploads/');
		},
		filename: (req, file, cb) => {
			cb(null, new mongoose.Types.ObjectId() + '-' + file.originalname);
		},
	});

	function fileFilter(req, file, cb) {
		if (file.mimetype==='application/pdf' || file.mimetype==('pdf')) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
	const upload = multer({ storage, fileFilter });

	return upload;
};

export const uploadSingleFile = fieldName=> fileUpload().single(fieldName);
export const uploadArrayOfFiles = fieldName =>fileUpload().array(fieldName, 10);
export const uploadFields = fields => fileUpload().fields(fields);
