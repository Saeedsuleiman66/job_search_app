import fs from "fs";
import path from "path";
import { createLogger, format as _format, transports as _transports } from "winston";


const logDir = "logs";
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const logger = createLogger({
	level: "info",
	format: _format.combine(
		_format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		_format.errors({ stack: true }),
		_format.splat(),
		_format.json()
	),
	transports: [
		
		new _transports.Console({
			format: _format.combine(
				_format.colorize(),  
				_format.simple()
			),
		}),
		
	
		new _transports.File({
			filename: path.join(logDir, "error.log"),
			level: "error",
			format: _format.combine(
				_format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				_format.errors({ stack: true }),
				_format.splat(),
				_format.json(),
				_format.uncolorize() 
			),
		}),

		new _transports.File({
			filename: path.join(logDir, "combined.log"),
			format: _format.combine(
				_format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				_format.errors({ stack: true }),
				_format.splat(),
				_format.json(),
				_format.uncolorize()  
			),
		}),
	],
});

export default logger;
