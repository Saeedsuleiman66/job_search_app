import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { DB_connection } from "./database/dbConnection.js";
import { globalError } from "./src/middleware/GlobalErrorMiddleWare.js";
import { bootstrap } from "./src/modules/index.routes.js";
import AppError from "./src/utils/AppError.js";
import logger from "./src/utils/logger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;
const morganFormat=':method :url :status :response-time ms';
app.use(morgan(morganFormat,{
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3]
            };
            if (logObject.status >= 500) {
                logger.error(JSON.stringify( logObject));
            } else if (logObject.status >= 400) {
                logger.warn(JSON.stringify( logObject));
            } else {
                logger.info(JSON.stringify( logObject));
            }
        }
    }
}));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));
app.use(helmet());

app.use("/uploads", express.static("uploads"));
bootstrap(app);
DB_connection();
app.use("*", (req, res, next) => {
	next(new AppError(`Couldn't connect : ${req.originalUrl}`, 404));
});
app.use(globalError);
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
